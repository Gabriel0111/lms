import { NextResponse } from "next/server";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { env } from "@/lib/env";
import { s3Client } from "@/lib/s3-client";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import arcjet, { detectBot, fixedWindow } from "@/lib/arcjet";
import { requireAdmin } from "@/app/data/admin/require-admin";

const aj = arcjet
  .withRule(
    detectBot({
      mode: "LIVE",
      allow: [],
    }),
  )
  .withRule(
    fixedWindow({
      mode: "LIVE",
      window: "1m",
      max: 5,
    }),
  );

export async function DELETE(req: Request, res: Response) {
  const session = await requireAdmin();

  try {
    const decision = await aj.protect(req, {
      fingerprint: session?.user.id as string,
    });

    if (decision.isDenied()) {
      return NextResponse.json({ message: "Denied session" }, { status: 429 });
    }

    const body = await req.json();
    const key = body.key;

    if (!key) {
      return NextResponse.json({ error: "Key not found." }, { status: 400 });
    }

    const command = new DeleteObjectCommand({
      Bucket: env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGE,
      Key: key,
    });

    await s3Client.send(command);

    return NextResponse.json(
      { message: "Deleted successfully." },
      { status: 200 },
    );
  } catch {
    return NextResponse.json({ error: "Key not found." }, { status: 500 });
  }
}

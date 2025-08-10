"use server";

import { courseSchema, CourseSchemaType } from "@/lib/zod-schema";
import { prisma } from "@/lib/prisma";
import { ApiResponse } from "@/lib/types";
import { requireAdmin } from "@/app/data/admin/require-admin";
import { request } from "@arcjet/next";
import arcjet from "@/lib/arcjet";

export async function CreateCourse(
  data: CourseSchemaType,
): Promise<ApiResponse> {
  const session = await requireAdmin();

  try {
    const req = await request();
    const decision = await arcjet.protect(req, {
      fingerprint: session.user.id,
    });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return {
          status: "error",
          message: "You have been rate limited ",
        };
      }
      return {
        status: "error",
        message: "You are a bot!",
      };
    }

    const validation = courseSchema.safeParse(data);

    if (!validation.success) {
      return {
        status: "error",
        message: "Invalid Form Data",
      };
    }

    const courseCreation = await prisma.course.create({
      data: {
        ...validation.data,
        userId: session?.user?.id,
      },
    });

    return {
      status: "success",
      message: "Course Created Successfully",
    };
  } catch {
    return {
      status: "error",
      message: "Could not create Course",
    };
  }
}

import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import * as db from "./db";
import { z } from "zod";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  schedule: router({
    getEmployees: publicProcedure.query(async () => {
      return db.getAllEmployees();
    }),

    getAttendance: publicProcedure
      .input(z.object({ employeeId: z.number() }))
      .query(async ({ input }) => {
        return db.getAttendanceRecords(input.employeeId);
      }),

    updateAttendance: protectedProcedure
      .input(z.object({
        employeeId: z.number(),
        dayIndex: z.number(),
        status: z.string(),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== 'admin') {
          throw new Error('Unauthorized');
        }
        
        const result = await db.updateAttendanceRecord(
          input.employeeId,
          input.dayIndex,
          input.status
        );

        await db.logAudit(
          input.employeeId,
          input.dayIndex,
          null,
          input.status,
          ctx.user.name || 'Unknown'
        );

        return result;
      }),

    getAuditLog: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user?.role !== 'admin') {
        throw new Error('Unauthorized');
      }
      return db.getAuditLogs();
    }),
  }),
});

export type AppRouter = typeof appRouter;

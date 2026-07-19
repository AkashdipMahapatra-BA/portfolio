import { Resend } from "resend";
import { TRPCError } from "@trpc/server";
import { router, publicProcedure } from "../trpc";
import { contactSchema } from "validators";

export const contactRouter = router({
  send: publicProcedure
    .input(contactSchema)
    .mutation(async ({ input }) => {
      const apiKey = process.env["RESEND_API_KEY"];
      const toEmail = process.env["CONTACT_TO_EMAIL"];

      if (!apiKey || !toEmail) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Email service is not configured.",
        });
      }

      const resend = new Resend(apiKey);

      try {
        const { error } = await resend.emails.send({
          from: "Portfolio Contact <onboarding@resend.dev>",
          to: toEmail,
          replyTo: input.email,
          subject: `[Portfolio] ${input.subject}`,
          text: [
            `From: ${input.name} <${input.email}>`,
            `Subject: ${input.subject}`,
            "",
            input.message,
          ].join("\n"),
        });

        if (error) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: error.message,
          });
        }

        return { success: true as const };
      } catch (err) {
        if (err instanceof TRPCError) throw err;
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to send email. Please try again later.",
        });
      }
    }),
});

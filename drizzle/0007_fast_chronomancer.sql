ALTER TABLE "reading_list" RENAME COLUMN "blod_id" TO "blog_id";--> statement-breakpoint
ALTER TABLE "reading_list" DROP CONSTRAINT "reading_list_blod_id_blogs_id_fk";
--> statement-breakpoint
ALTER TABLE "reading_list" ADD CONSTRAINT "reading_list_blog_id_blogs_id_fk" FOREIGN KEY ("blog_id") REFERENCES "public"."blogs"("id") ON DELETE no action ON UPDATE no action;
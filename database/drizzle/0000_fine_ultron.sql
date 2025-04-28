CREATE TYPE "public"."onboarding_status" AS ENUM('pending', 'completed');--> statement-breakpoint
CREATE TYPE "public"."onboarding_step" AS ENUM('profile', 'workspace', 'collaborate');--> statement-breakpoint
CREATE TYPE "public"."invitation_status" AS ENUM('pending', 'expired', 'accepted');--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('admin', 'member');--> statement-breakpoint
CREATE TABLE "account" (
	"id" text PRIMARY KEY NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "user_onboarding" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"onboarding_status" "onboarding_status" DEFAULT 'pending' NOT NULL,
	"onboarding_step" "onboarding_step" DEFAULT 'profile' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean NOT NULL,
	"image" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "user_email_unique" UNIQUE("email"),
	CONSTRAINT "user_email_unique_index" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "workspace" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"logo" text,
	"slug" text NOT NULL,
	"owner_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "workspace_slug_unique" UNIQUE("slug"),
	CONSTRAINT "slug_unique_index" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "invitation" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"role" "role" DEFAULT 'member',
	"expires_at" timestamp NOT NULL,
	"invitation_status" "invitation_status" DEFAULT 'pending',
	"invited_by" text NOT NULL,
	"workspace_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_onboarding" ADD CONSTRAINT "user_onboarding_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workspace" ADD CONSTRAINT "workspace_owner_id_user_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invitation" ADD CONSTRAINT "invitation_invited_by_user_id_fk" FOREIGN KEY ("invited_by") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invitation" ADD CONSTRAINT "invitation_workspace_id_workspace_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspace"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "account_user_id_index" ON "account" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "account_id_indedx" ON "account" USING btree ("account_id");--> statement-breakpoint
CREATE INDEX "account_provider_id_index" ON "account" USING btree ("provider_id");--> statement-breakpoint
CREATE INDEX "onboarding_user_id_index" ON "user_onboarding" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "ownerId_index" ON "workspace" USING btree ("owner_id");--> statement-breakpoint
CREATE INDEX "invitation_email_index" ON "invitation" USING btree ("email");--> statement-breakpoint
CREATE INDEX "invited_by_index" ON "invitation" USING btree ("invited_by");--> statement-breakpoint
CREATE INDEX "invitation_workspaceId_index" ON "invitation" USING btree ("workspace_id");
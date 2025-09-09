CREATE TABLE "herbal_plants" (
	"id" serial PRIMARY KEY NOT NULL,
	"common_name" varchar(255) NOT NULL,
	"scientific_name" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"medicinal_properties" text NOT NULL,
	"used_parts" jsonb NOT NULL,
	"preparation_methods" text NOT NULL,
	"habitat" varchar(255) NOT NULL,
	"image_urls" jsonb NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);

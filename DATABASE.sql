CREATE TABLE "users" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL UNIQUE,
	"password" varchar(255) NOT NULL,
	"cpf" varchar(11) NOT NULL UNIQUE,
	"photo" TEXT,
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);


CREATE TABLE "addresses" (
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"address" varchar(255) NOT NULL,
	"cep" varchar(255) NOT NULL,
	"complement" varchar(255),
	"state_id" integer NOT NULL,
	CONSTRAINT "addresses_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "states" (
	"id" serial NOT NULL,
	"acronym" varchar(2) NOT NULL UNIQUE,
	"name" varchar(255) NOT NULL UNIQUE,
	CONSTRAINT "states_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "phones" (
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"phone" varchar(20) NOT NULL,
	CONSTRAINT "phones_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "products" (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL,
	"description" TEXT NOT NULL,
	"price" DECIMAL NOT NULL,
	"quantity" integer NOT NULL DEFAULT '0',
	"photo" TEXT NOT NULL,
	CONSTRAINT "products_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "aspects" (
	"id" serial NOT NULL,
	"product_id" integer NOT NULL,
	"name" varchar(255) NOT NULL,
	"value" varchar(255) NOT NULL,
	CONSTRAINT "aspects_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "charts_products" (
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"product_id" integer NOT NULL,
	"quantity" integer NOT NULL DEFAULT '1',
	"chart_id" integer NOT NULL,
	CONSTRAINT "charts_products_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "orders" (
	"id" serial NOT NULL,
	"user_id" serial NOT NULL,
	"chart_id" integer NOT NULL,
	CONSTRAINT "orders_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "charts" (
	"id" serial NOT NULL,
	"finished" bool NOT NULL DEFAULT 'false',
	CONSTRAINT "charts_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "sessions" (
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"token" TEXT NOT NULL UNIQUE,
	CONSTRAINT "sessions_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "addresses" ADD CONSTRAINT "addresses_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_fk1" FOREIGN KEY ("state_id") REFERENCES "states"("id");


ALTER TABLE "phones" ADD CONSTRAINT "phones_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");


ALTER TABLE "aspects" ADD CONSTRAINT "aspects_fk0" FOREIGN KEY ("product_id") REFERENCES "products"("id");

ALTER TABLE "charts_products" ADD CONSTRAINT "charts_products_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");
ALTER TABLE "charts_products" ADD CONSTRAINT "charts_products_fk1" FOREIGN KEY ("product_id") REFERENCES "products"("id");
ALTER TABLE "charts_products" ADD CONSTRAINT "charts_products_fk2" FOREIGN KEY ("chart_id") REFERENCES "charts"("id");

ALTER TABLE "orders" ADD CONSTRAINT "orders_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");
ALTER TABLE "orders" ADD CONSTRAINT "orders_fk1" FOREIGN KEY ("chart_id") REFERENCES "charts"("id");


ALTER TABLE "sessions" ADD CONSTRAINT "sessions_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");
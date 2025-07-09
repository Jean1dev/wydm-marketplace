CREATE TABLE `seller_wyd` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`wyd_nickname` varchar(100) NOT NULL,
	`total_sells` int NOT NULL DEFAULT 0,
	`total_reviews` int NOT NULL DEFAULT 0,
	`reputation` int NOT NULL DEFAULT 1,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `seller_wyd_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `reviews_wyd` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(255) NOT NULL,
	`rating` int NOT NULL,
	`observation` text,
	`seller_fk` int NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `reviews_wyd_id` PRIMARY KEY(`id`)
);
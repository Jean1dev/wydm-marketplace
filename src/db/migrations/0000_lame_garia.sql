CREATE TABLE `products_wyd` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`category` varchar(100) NOT NULL,
	`amount` decimal(10,2) NOT NULL,
	`quantity` int NOT NULL DEFAULT 0,
	`seller_name` varchar(255) NOT NULL,
	`seller_reputation` int NOT NULL DEFAULT 1,
	`seller_fk` int NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `products_id` PRIMARY KEY(`id`)
);

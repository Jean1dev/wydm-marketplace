CREATE TABLE `categories` (
	`id` int AUTO_INCREMENT NOT NULL,
	`titulo` varchar(255) NOT NULL,
	`emoji` varchar(10),
	`categoria_exclusiva_adms` boolean NOT NULL DEFAULT false,
	CONSTRAINT `categories_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `posts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`titulo` varchar(255) NOT NULL,
	`descricao` text NOT NULL,
	`descricao_truncada` varchar(500),
	`data_criacao` datetime NOT NULL,
	`data_atualizacao` datetime,
	`esta_bloqueado` boolean NOT NULL DEFAULT false,
	`esta_visivel` boolean NOT NULL DEFAULT true,
	`autor_id` int NOT NULL,
	`autor_nome` varchar(255) NOT NULL,
	`autor_avatar` varchar(500),
	`categoria_id` int NOT NULL,
	CONSTRAINT `posts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `midias` (
	`id` int AUTO_INCREMENT NOT NULL,
	`url_midia` varchar(500) NOT NULL,
	`post_id` int NOT NULL,
	CONSTRAINT `midias_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `interacoes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`descricao` text NOT NULL,
	`autor_id` int NOT NULL,
	`autor_nome` varchar(255) NOT NULL,
	`autor_avatar` varchar(500),
	`post_id` int NOT NULL,
	`data_criacao` datetime NOT NULL,
	CONSTRAINT `interacoes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `usuarios` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email_plataforma_crypto` varchar(255),
	`email_provedor_externo` varchar(255),
	`id_provedor_oauth` varchar(255),
	`nome` varchar(255) NOT NULL,
	`avatar` varchar(500),
	`data_criacao` datetime NOT NULL,
	`data_ultima_visita` datetime,
	`quantidade_interacoes` int NOT NULL DEFAULT 0,
	`aniversario` date,
	`instagram` varchar(255),
	`whatsapp` varchar(20),
	CONSTRAINT `usuarios_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `reputacao` (
	`id` int AUTO_INCREMENT NOT NULL,
	`autor_id` int NOT NULL,
	`reputacao` int NOT NULL DEFAULT 0,
	`respostas_comunidade` int NOT NULL DEFAULT 0,
	`badge` varchar(100),
	CONSTRAINT `reputacao_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `table_views` (
	`id` int AUTO_INCREMENT NOT NULL,
	`post_id` int NOT NULL,
	`contador_views` int NOT NULL DEFAULT 0,
	CONSTRAINT `table_views_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `table_views` ADD CONSTRAINT `table_views_post_id_posts_id_fk` FOREIGN KEY (`post_id`) REFERENCES `posts`(`id`) ON DELETE no action ON UPDATE no action;
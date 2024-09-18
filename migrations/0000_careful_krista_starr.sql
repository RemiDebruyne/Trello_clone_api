CREATE TABLE IF NOT EXISTS `cardTag` (
	`id` int AUTO_INCREMENT NOT NULL,
	`cardId` int,
	`tagId` int,
	CONSTRAINT `cardTag_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `Cards` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(50) NOT NULL,
	`listId` int NOT NULL,
	`description` text,
	`start_date` date NOT NULL,
	`end_date` date,
	CONSTRAINT `Cards_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `Lists` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(50) NOT NULL,
	`tableId` int NOT NULL,
	CONSTRAINT `Lists_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `Tables` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(50) NOT NULL,
	CONSTRAINT `Tables_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `Tags` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(50) NOT NULL,
	`color` varchar(6) NOT NULL,
	CONSTRAINT `Tags_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `cardTag` ADD CONSTRAINT `cardTag_cardId_Cards_id_fk` FOREIGN KEY (`cardId`) REFERENCES `Cards`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `cardTag` ADD CONSTRAINT `cardTag_tagId_Tags_id_fk` FOREIGN KEY (`tagId`) REFERENCES `Tags`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Cards` ADD CONSTRAINT `Cards_listId_Lists_id_fk` FOREIGN KEY (`listId`) REFERENCES `Lists`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Lists` ADD CONSTRAINT `Lists_tableId_Tables_id_fk` FOREIGN KEY (`tableId`) REFERENCES `Tables`(`id`) ON DELETE no action ON UPDATE no action;
ALTER TABLE `cardTag` DROP FOREIGN KEY `cardTag_cardId_Cards_id_fk`;
--> statement-breakpoint
ALTER TABLE `cardTag` ADD CONSTRAINT `cardTag_cardId_Cards_id_fk` FOREIGN KEY (`cardId`) REFERENCES `Cards`(`id`) ON DELETE cascade ON UPDATE no action;
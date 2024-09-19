ALTER TABLE `cardTag` DROP FOREIGN KEY `cardTag_tagId_Tags_id_fk`;
--> statement-breakpoint
ALTER TABLE `Cards` DROP FOREIGN KEY `Cards_listId_Lists_id_fk`;
--> statement-breakpoint
ALTER TABLE `Lists` DROP FOREIGN KEY `Lists_tableId_Tables_id_fk`;
--> statement-breakpoint
ALTER TABLE `cardTag` ADD CONSTRAINT `cardTag_tagId_Tags_id_fk` FOREIGN KEY (`tagId`) REFERENCES `Tags`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Cards` ADD CONSTRAINT `Cards_listId_Lists_id_fk` FOREIGN KEY (`listId`) REFERENCES `Lists`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Lists` ADD CONSTRAINT `Lists_tableId_Tables_id_fk` FOREIGN KEY (`tableId`) REFERENCES `Tables`(`id`) ON DELETE cascade ON UPDATE no action;
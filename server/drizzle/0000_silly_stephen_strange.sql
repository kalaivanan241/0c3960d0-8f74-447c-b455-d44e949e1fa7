CREATE TABLE `devices-savings` (
	`id` integer PRIMARY KEY NOT NULL,
	`timestamp` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`device_timestamp` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`carbon_saved` integer NOT NULL,
	`fueld_saved` integer NOT NULL,
	`device_id` integer NOT NULL,
	FOREIGN KEY (`device_id`) REFERENCES `devices`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `devices` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text,
	`timezone` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `nameIdx` ON `devices` (`name`);
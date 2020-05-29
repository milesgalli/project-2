CREATE TABLE `users` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `full_name` varchar(255),
  `email` varchar(255),
  `password` varchar(255),
  `role` varchar(255),
  `technologies` JSON NULL,
  `course_graduated` varchar(255),
  `employment` boolean,
  `location` varchar(255),
  `created_at` timestamp,
  `updated_at` timestamp,

);

CREATE TABLE `companies` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `company_name` varchar(255),
  `number_employees` integer,
  `location` varchar(255),
  `industry` varchar(255),
  `created_at` timestamp,
  `updated_at` timestamp
);

CREATE TABLE `hackathons` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `title` varchar(255),
  `description` varchar(255),
  `max_student` integer,
  `start_date` timestamp,
  `end_date` timestamp,
  `company_id` integer,
  `created_at` timestamp,
  `updated_at` timestamp
);

CREATE TABLE `hackathon_user` (
  `user_id` int,
  `hackathon_id` int,
  PRIMARY KEY (`user_id`, `hackathon_id`)
);

-- ALTER TABLE `users` ADD FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`);

ALTER TABLE `hackathons` ADD FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`);

ALTER TABLE `hackathon_user` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `hackathon_user` ADD FOREIGN KEY (`hackathon_id`) REFERENCES `hackathons` (`id`);


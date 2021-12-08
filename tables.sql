
--
-- Database: temperature_app
-- By Bishrul Haq
--


--
-- Table structure for table `users`
--


CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(240) NOT NULL,
  `password` varchar(240) NOT NULL,
  PRIMARY KEY (`id`)
);

--
-- Table structure for table `weather`
--

CREATE TABLE `weather` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `country` varchar(240) NOT NULL,
  `date` datetime DEFAULT NULL,
  `place` varchar(240) NOT NULL,
  `user_id` varchar(240) NOT NULL,
  `temp` varchar(240) NOT NULL,
  PRIMARY KEY (`id`)
);
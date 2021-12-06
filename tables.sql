
--
-- Database: temperature_app
-- By Bishrul Haq
--


--
-- Table structure for table `users`
--


CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(240) NOT NULL,
  `password` varchar(240) NOT NULL
);

--
-- Table structure for table `weather`
--

CREATE TABLE `weather` (
  `id` int(11) NOT NULL,
  `country` varchar(240) NOT NULL,
  `date` datetime DEFAULT NULL,
  `place` varchar(240) NOT NULL,
  `user_id` varchar(240) NOT NULL,
  `temp` varchar(240) NOT NULL
);
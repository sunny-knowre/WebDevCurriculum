use notepad;

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nickname` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `salt` varchar(255) DEFAULT NULL,
  `img_url` varchar(255) DEFAULT NULL,
  `last_note` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `users_id_unique` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`id`, `nickname`, `email`, `password`, `salt`, `last_note`, `createdAt`, `updatedAt`)
VALUES
	(1,'sunny','sunny@note.com','90f81f57e4d8e28250cea42ebaf30be4a65c0febd60572dfa848e3e5b455ee98e3da177f72cc2f6b893d3263d4942375f3abe484947df6f74bbaeede5dae624c','ld)S?kG:*jf~j*-=L~fjr-Nr:OsPeKYTTQdhrRL=8@$y@-Ly|$ZQEdr5tdNS.P{2','2','2017-12-12 06:49:39','2017-12-12 06:50:52'),
	(2,'kurt','kurt@note.com','0243f7520ebc3a609f6094c419da423616e2cd765f68bfb4001931ec3fd9e430c91cae8a28bd0585a3441f4fdac32138e8cfaadbf028a6295f305efbc56f7b5e','0I%-}?A3{Z.c]kC1|*xmpM~Pnnr92K:IbJ{@qVw<~.wMo+ uGMV+O*S}l&y2&`zJ','3','2017-12-12 06:49:39','2017-12-12 06:52:55'),
	(3,'root','root@note.com','145b80d66bdec562cb3841a76fe743cc478b5aba25a065ce7b155bad36df201ef0317fd10d57ead13890fa3f7ed91904b3afc7c1b83eb9018c5ab66d57274687','I.xKv;{pjcmQIjx+~O0{c+4Vg<`TTiasJPA]qdbrMca*]gF?jSZyU1UJwFHL+/b0','4','2017-12-12 06:49:39','2017-12-12 06:52:23');

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

DROP TABLE IF EXISTS `notes`;

CREATE TABLE `notes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `body` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `notes_id_unique` (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `notes_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `notes` WRITE;
/*!40000 ALTER TABLE `notes` DISABLE KEYS */;

INSERT INTO `notes` (`id`, `title`, `body`, `createdAt`, `updatedAt`, `userId`)
VALUES
	(1,'sunny first note','sunny first note','2017-12-12 06:49:39','2017-12-12 06:50:35',1),
	(2,'sunny second note','sunny second note','2017-12-12 06:49:39','2017-12-12 06:50:44',1),
	(3,'kurt first note','kurt first note','2017-12-12 06:49:39','2017-12-12 06:52:32',2),
	(4,'How to use guide for root','How to use guide for root\n\n1. Click on new note to create a new note.\n2. Click on tabs to switch notes\n3. Save with Cmd + enter or clicking save the button\n4. Delete with the delete button','2017-12-12 06:49:39','2017-12-12 06:51:22',3),
	(5,'sunny last note','sunny last note','2017-12-12 06:50:45','2017-12-12 06:50:51',1),
	(6,'root second note','root second note\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.','2017-12-12 06:51:26','2017-12-12 06:51:55',3),
	(7,'kurt second note','kurt second note','2017-12-12 06:52:34','2017-12-12 06:52:44',2),
	(8,'kurt last note','kurt last note','2017-12-12 06:52:45','2017-12-12 06:52:49',2);

/*!40000 ALTER TABLE `notes` ENABLE KEYS */;
UNLOCK TABLES;



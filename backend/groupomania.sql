-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : Dim 15 nov. 2020 à 15:58
-- Version du serveur :  10.4.14-MariaDB
-- Version de PHP : 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `groupomania`
--

-- --------------------------------------------------------

--
-- Structure de la table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `authorname` varchar(255) NOT NULL,
  `authorfirstname` varchar(255) NOT NULL,
  `authorid` int(11) NOT NULL,
  `publicationid` int(11) NOT NULL,
  `commentary` varchar(255) NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `comments`
--

INSERT INTO `comments` (`id`, `authorname`, `authorfirstname`, `authorid`, `publicationid`, `commentary`, `date`) VALUES
(73, 'Petit', 'Michel', 51, 106, 'Super !', '2020-11-15 15:45:53'),
(75, 'Dubois', 'Nicolas', 52, 106, 'TOP !', '2020-11-15 15:47:25');

-- --------------------------------------------------------

--
-- Structure de la table `publications`
--

CREATE TABLE `publications` (
  `id` int(11) NOT NULL,
  `authorname` varchar(255) NOT NULL,
  `authorfirstname` varchar(255) NOT NULL,
  `authorid` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `attachment` varchar(255) NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `publications`
--

INSERT INTO `publications` (`id`, `authorname`, `authorfirstname`, `authorid`, `title`, `attachment`, `date`) VALUES
(106, 'Dupont', 'Jean', 50, 'Voici une photo de mes dernières vacances :', 'Vacances.jpg1605451474583.jpg', '2020-11-15 15:44:34'),
(109, 'Dubois', 'Nicolas', 52, 'La voiture de mes rêves :', 'Voiture.jpg1605451695177.jpg', '2020-11-15 15:48:15');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `role` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `name`, `firstname`, `role`) VALUES
(8, 'admin@admin.com', '$2b$10$MPx7UEXcXYDGaitjNgRvf.sjo93HyGrayf7dnK7fwbg4f3yOK6/fW', 'Admin', 'Admin', 'admin'),
(50, 'test@email.com', '$2b$10$VRFDqBTZK86gEnpj8HpRb.KY5zkdmR.05yGKDsMgBB9PBRx03r.E2', 'Dupont', 'Jean', 'user'),
(51, 'test2@email.com', '$2b$10$qqpaepIrI3S.bmSP4IPVDeew37IsIIa5anWKhq322CKg9pLok6DMO', 'Petit', 'Michel', 'user'),
(52, 'test3@email.com', '$2b$10$b82ur/YmKT3HBEu1YS6N5OfcuOLpMPg7wmzkU46P6prdotMgUnQYW', 'Dubois', 'Nicolas', 'user');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `comments_ibfk_1` (`publicationid`),
  ADD KEY `comments_ibfk_2` (`authorid`);

--
-- Index pour la table `publications`
--
ALTER TABLE `publications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `publications_ibfk_1` (`authorid`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;

--
-- AUTO_INCREMENT pour la table `publications`
--
ALTER TABLE `publications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=111;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`publicationid`) REFERENCES `publications` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`authorid`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `publications`
--
ALTER TABLE `publications`
  ADD CONSTRAINT `publications_ibfk_1` FOREIGN KEY (`authorid`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

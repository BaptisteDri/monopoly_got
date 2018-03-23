-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Client :  localhost
-- Généré le :  Mar 20 Mars 2018 à 00:16
-- Version du serveur :  10.1.19-MariaDB
-- Version de PHP :  5.6.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `got`
--

-- --------------------------------------------------------

--
-- Structure de la table `allegeance`
--

CREATE TABLE `allegeance` (
  `id` int(11) NOT NULL,
  `content` text NOT NULL,
  `effect` varchar(45) DEFAULT NULL,
  `effect_type` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `allegeance`
--

INSERT INTO `allegeance` (`id`, `content`, `effect`, `effect_type`) VALUES
(1, 'Vous êtes envoyé au-delà le mur.', '11', NULL),
(2, 'Rendez-vous à Winterfell.', '30', NULL),
(3, 'Rendez-vous à Pyke.', '20', NULL),
(4, 'Rendez-vous à Braavos.', '23', NULL),
(5, 'Rendez-vous à Oldtown.', '33', NULL),
(6, 'Votre précepteur et votre prêt rapportent 150 000 Dragons d’or.', '150000', 1),
(7, 'Amende pour meurtre : payez 100 000 Dragons d’or.', '100000', 0),
(8, 'La banque vous verse un dividende de 50 000 Dragons d’or.', '50000', 1);

-- --------------------------------------------------------

--
-- Structure de la table `case_plate`
--

CREATE TABLE `case_plate` (
  `id` int(11) NOT NULL,
  `player_id` int(11) DEFAULT NULL,
  `level` int(1) DEFAULT NULL,
  `cost` int(9) DEFAULT NULL,
  `name` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `case_plate`
--

INSERT INTO `case_plate` (`id`, `player_id`, `level`, `cost`, `name`) VALUES
(1, NULL, NULL, NULL, 'Départ'),
(2, NULL, 1, 60, 'Eyrie'),
(3, NULL, NULL, NULL, 'Allegeance'),
(4, NULL, 1, 60, 'Inn at the Crossroads'),
(5, NULL, NULL, NULL, 'Little Finger Taxe'),
(6, NULL, 1, 200, 'Vhagar'),
(7, NULL, 1, 100, 'Felwood'),
(8, NULL, NULL, NULL, 'Double Face'),
(9, NULL, 1, 100, 'Summerhall'),
(10, NULL, 1, 120, 'Storm''s End'),
(11, NULL, NULL, NULL, 'Beyond the wall'),
(12, NULL, 1, 140, 'Saltshore'),
(13, NULL, NULL, NULL, 'The 13'),
(14, NULL, 1, 140, 'Kingsgrave'),
(15, NULL, 1, 160, 'Sunspear'),
(16, NULL, 1, 200, 'Rhaegal'),
(17, NULL, 1, 180, 'Riverrun'),
(18, NULL, NULL, NULL, 'Allegeance'),
(19, NULL, 1, 180, 'The Twins'),
(20, NULL, 1, 200, 'Pyke'),
(21, NULL, NULL, NULL, 'The 3 Eyes Raven'),
(22, NULL, 1, 220, 'Pentos'),
(23, NULL, NULL, NULL, 'Double Face'),
(24, NULL, 1, 220, 'Braavos'),
(25, NULL, 1, 240, 'Dragonstone'),
(26, NULL, 1, 200, 'Drogon'),
(27, NULL, 1, 260, 'The Dreadfort'),
(28, NULL, 1, 260, 'Castle Black'),
(29, NULL, NULL, NULL, 'Braavos Bank'),
(30, NULL, 1, 280, 'Winterfell'),
(31, NULL, NULL, NULL, 'Go Beyond The Wall'),
(32, NULL, 1, 300, 'Tumbleton'),
(33, NULL, 1, 300, 'Old Town'),
(34, NULL, NULL, NULL, 'Allegeance'),
(35, NULL, 1, 320, 'Highgarden'),
(36, NULL, 1, 200, 'Viserion'),
(37, NULL, NULL, NULL, 'Double Face'),
(38, NULL, 1, 350, 'Casterly Rock'),
(39, NULL, NULL, NULL, 'Lannister Taxe'),
(40, NULL, 1, 400, 'King''s Landing');

-- --------------------------------------------------------

--
-- Structure de la table `double_face`
--

CREATE TABLE `double_face` (
  `id` int(11) NOT NULL,
  `content` text NOT NULL,
  `effect` varchar(45) NOT NULL,
  `effect_type` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `double_face`
--

INSERT INTO `double_face` (`id`, `content`, `effect`, `effect_type`) VALUES
(1, 'Vous vous exilez au-delà le mur.', '11', NULL),
(2, 'La vente de vos ressources vous rapporte 50 000 Dragons d’or.', '50000', 1),
(3, 'La vente de vos équipements vous rapporte 100 000 Dragons d’or.', '100000', 1),
(4, 'Erreur de la banque de Braavos en votre faveur, recevez 200 000 Dragons d’or.', '200000', 1),
(5, 'Taxe de mise en vente de vos objets, recevez 50 000 Dragons d’or.', '50000', 1),
(6, 'Visite chez Cersei, payez 50 000 Dragons d’or.', '50000', 0),
(7, 'Un Dothraki a volé vos Dragons d’or, vous perdez 100 000 Dragons d’or.', '100000', 0),
(8, 'Votre ami Ned Stark est décédé vous recevez 100 000 Dragons d’or.', '100000', 1),
(9, 'Vous gagné un combat, recevez 50 000 Dragons d’or.', '50000', 1),
(10, 'Vos découvertes vous rapportent 100 000 Dragons d’or.', '100000', 1);

-- --------------------------------------------------------

--
-- Structure de la table `player`
--

CREATE TABLE `player` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `money` int(9) NOT NULL,
  `color` varchar(45) NOT NULL,
  `case_id` int(2) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `player`
--

INSERT INTO `player` (`id`, `name`, `money`, `color`, `case_id`) VALUES
(1, 'Tyrion', 1000000, 'green', 1),
(2, 'Cersei', 1000000, 'red', 1),
(3, 'John Snow', 1000000, 'white', 1),
(4, 'Daenerys', 1000000, 'blue', 1);

--
-- Index pour les tables exportées
--

--
-- Index pour la table `allegeance`
--
ALTER TABLE `allegeance`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `case_plate`
--
ALTER TABLE `case_plate`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `double_face`
--
ALTER TABLE `double_face`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `player`
--
ALTER TABLE `player`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `allegeance`
--
ALTER TABLE `allegeance`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT pour la table `case_plate`
--
ALTER TABLE `case_plate`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;
--
-- AUTO_INCREMENT pour la table `double_face`
--
ALTER TABLE `double_face`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT pour la table `player`
--
ALTER TABLE `player`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 23, 2020 at 05:22 PM
-- Server version: 10.4.8-MariaDB
-- PHP Version: 7.1.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `maps_test`
--

-- --------------------------------------------------------

--
-- Table structure for table `buildingdata`
--

CREATE TABLE `buildingdata` (
  `BuildingID` varchar(255) NOT NULL,
  `BuildingName` varchar(500) NOT NULL,
  `BuildingDescription` varchar(500) NOT NULL,
  `BuildingFloorID` int(255) NOT NULL,
  `FloorCount` int(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `buildingdata`
--

INSERT INTO `buildingdata` (`BuildingID`, `BuildingName`, `BuildingDescription`, `BuildingFloorID`, `FloorCount`) VALUES
('CW-E', 'Cornwallis East', 'Cornwallis East Bulding', 0, 2),
('CW-NW', 'Cornwallis North West', 'Cornwallis North West', 0, 2),
('CW-Oct', 'Cornwallis Octogon', 'Cornwallis Octagon building', 0, 2),
('CW-S', 'Cornwallis South', 'School Of Computing', 0, 2),
('CW-SW', 'Cornwallis Southwest', 'Cornwallis Southwest Building', 0, 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `buildingdata`
--
ALTER TABLE `buildingdata`
  ADD PRIMARY KEY (`BuildingID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

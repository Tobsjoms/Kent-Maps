-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 10, 2019 at 10:44 AM
-- Server version: 10.4.8-MariaDB
-- PHP Version: 7.3.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kentmaps`
--

-- --------------------------------------------------------

--
-- Table structure for table `buildingdata`
--

CREATE TABLE `buildingdata` (
  `BuildingID` int(255) NOT NULL,
  `BuildingName` varchar(500) NOT NULL,
  `BuildingDescription` varchar(500) NOT NULL,
  `BuildingFloorID` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `roomdata`
--

CREATE TABLE `roomdata` (
  `RoomID` varchar(256) NOT NULL,
  `RoomType` varchar(500) NOT NULL,
  `BuildingID` varchar(256) NOT NULL,
  `RoomDesc` varchar(5000) NOT NULL,
  `RoomPhoneNumber` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `staff`
--

CREATE TABLE `staff` (
  `StaffID` varchar(150) NOT NULL,
  `Department` varchar(200) NOT NULL,
  `Name` varchar(200) NOT NULL,
  `Description` varchar(255) NOT NULL,
  `Email` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `staff_room`
--

CREATE TABLE `staff_room` (
  `RoomID` varchar(256) NOT NULL,
  `StaffID` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `UserID` varchar(100) NOT NULL,
  `Email` varchar(500) NOT NULL,
  `Password` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `buildingdata`
--
ALTER TABLE `buildingdata`
  ADD PRIMARY KEY (`BuildingID`);

--
-- Indexes for table `roomdata`
--
ALTER TABLE `roomdata`
  ADD PRIMARY KEY (`RoomID`);

--
-- Indexes for table `staff`
--
ALTER TABLE `staff`
  ADD PRIMARY KEY (`StaffID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`UserID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

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
-- Table structure for table `roomdata`
--

CREATE TABLE `roomdata` (
  `RoomID` varchar(32) NOT NULL,
  `BuildingID` varchar(32) DEFAULT NULL,
  `RoomType` varchar(128) DEFAULT NULL,
  `Capacity` int(4) DEFAULT NULL,
  `Equipment` varchar(512) DEFAULT NULL,
  `Disabled Access` varchar(4) DEFAULT NULL,
  `BasicDirections` varchar(512) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `roomdata`
--

INSERT INTO `roomdata` (`RoomID`, `BuildingID`, `RoomType`, `Capacity`, `Equipment`, `Disabled Access`, `BasicDirections`) VALUES
('CCLT1', 'CW-C', 'Lecture Theatre', 123, 'Microphone, DVD player, Data projector, VGA connection, Computer, Infra red hearing system, Active Panel, Blu Ray, Document Camera, Lecture Capture, HDMI Connection, Hearing Assistance Technology', 'Yes', '	Enter the Cornwallis building via the doors to CW-E Carpark. Turn right to the room.'),
('CEPC1', 'CW-E', 'Computer Room', 30, 'Data projector, VGA connection, Computer, Infra red hearing system, Lecture Capture, HDMI Connection, Hearing Assistance Technology', 'Yes', 'CW-E entrance is located near the Darwin Road bus stop. Entering by the main door, turn right. The room is on the ground floor.'),
('CEPC2', 'CW-E', 'Computer Room', 18, 'Data projector, VGA connection, Computer, Infra red hearing system, Lecture Capture, HDMI Connection, Hearing Assistance Technology', 'Yes', 'CW-E entrance is located near the Darwin Road bus stop. Entering by the main door, turn right. The room is on the ground floor.'),
('CESR1', 'CW-E', 'Seminar Room', 50, 'DVD player, Data projector, VGA connection, Computer, Infra red hearing system, Blu Ray, Lecture Capture, HDMI Connection, Hearing Assistance Technology', 'Yes', 'CW-E entrance is located near the Darwin Road bus stop. Entering by the main door, turn left. The room is on the ground floor at the end of the corridor.'),
('CESR2', 'CW-E', 'Seminar Room', 50, 'Video Conferencing on request, DVD player, Data projector, VGA connection, Computer, Infra red hearing system, Blu Ray, Lecture Capture, Telephone, HDMI Connection, Hearing Loop, Hearing Assistance Technology', 'Yes', 'CW-E entrance is located near the Darwin Road bus stop. Entering by the main door, turn right. The room is on the ground floor at the end of the corridor.'),
('CESR3', 'CW-E', 'Seminar Room', 8, 'VGA connection, Computer, Infra red hearing system, Lecture Capture, HDMI Connection, Hearing Assistance Technology', 'Yes', 'CW-E entrance is located near the Darwin Road bus stop. Entering by the main door, turn left. The room is on the ground floor on your left immediately after the double doors.'),
('CESR4', 'CW-E', 'Seminar Room', 8, '	VGA connection, Computer, Infra red hearing system, Lecture Capture, HDMI Connection, Hearing Assistance Technology', 'Yes', 'CW-E entrance is located near the Darwin Road bus stop. Entering by the main door, turn left. The room is on the ground floor on your right immediately after the double doors'),
('CNWsr1', 'CW-NW', 'Seminar Room', 18, 'DVD player, Data projector, VGA connection, Computer, Blu Ray, Lecture Capture, HDMI Connection', 'Yes', 'Turn right on entering building from the doors facing Colyer-Fergusson. The room is at the end of the corridor on the left.'),
('CNWsr10', 'CW-NW', 'Seminar Room', 18, 'DVD player, Data projector, VGA connection, Computer, Blu Ray, Lecture Capture, HDMI Connection', 'No', 'On entering CW-NW go up the stairs to the first floor and turn right. Turn left and up the stairs to the second floor. Take the door on the right at the top of the stairs, the room is at the end of the corridor.'),
('CNWsr11', 'CW-NW', 'Seminar Room', 16, 'DVD player, Data projector, VGA connection, Computer, Blu Ray, Lecture Capture, HDMI Connection', 'No', 'On entering CW-NW go up the stairs to the first floor and turn right. Turn left and up the stairs to the second floor. Take the door on the left at the top of the stairs, the room directly ahead.'),
('CNWsr12', 'CW-NW', 'Seminar Room', 18, '	DVD player, Data projector, VGA connection, Computer, Blu Ray, Lecture Capture, HDMI Connection', 'No', 'On entering CW-NW go up the stairs to the first floor and turn right. Turn left and up the stairs to the second floor. Take the door on the left at the top of the stairs, the room is at the end of the corridor.'),
('CNWsr2', 'CW-NW', 'Seminar Room', 24, 'DVD player, Data projector, VGA connection, Computer, Blu Ray, Lecture Capture, HDMI Connection', 'Yes', 'On entering CW-NW turn left into the lobby, the room is the first on your left.'),
('CNWsr5', 'CW-NW', 'Seminar Room', 30, 'DVD player, Data projector, VGA connection, Computer, Blu Ray, Lecture Capture, HDMI Connection', 'Yes', 'On entering CW-NW turn left into the lobby, the room is the first down the courtyard corridor.'),
('CNWsr6', 'CW-NW', 'Seminar Room', 30, 'DVD player, Data projector, VGA connection, Computer, Blu Ray, Lecture Capture, HDMI Connection', 'Yes', 'On entering CW-NW turn left into the lobby, the room is the second down the courtyard corridor.'),
('CNWsr7', 'CW-NW', 'Seminar Room', 30, 'DVD player, Data projector, VGA connection, Computer, Blu Ray, Lecture Capture, HDMI Connection', 'Yes', 'On entering CW-NW turn left into the lobby, the room is the third down the courtyard corridor.'),
('CNWsr8', 'CW-NW', 'Seminar Room', 30, '	DVD player, Data projector, VGA connection, Computer, Blu Ray, Lecture Capture, HDMI Connection', 'Yes', 'On entering CW-NW turn left into the lobby, the room is the forth down the courtyard corridor.'),
('CNWsr9', 'CW-NW', 'Seminar Room', 30, 'DVD player, Data projector, VGA connection, Computer, Blu Ray, Lecture Capture, HDMI Connection', 'Yes', 'On entering CW-NW turn left into the lobby, the room is the last down the courtyard corridor.'),
('COLT2(114)', 'CW-Oct', 'Lecture Theatre', 114, 'Microphone, DVD player, Data projector, VGA connection, Computer, Infra red hearing system, Active Panel, Blu Ray, Document Camera, Lecture Capture, HDMI Connection, Hearing Assistance Technology', 'Yes', 'Enter the Cornwallis building through the doors by the Octagon. Turn right, the room is on your left.'),
('COLT3(68)', 'CW-Oct', 'Lecture Theatre', 68, 'Video Conferencing on request, Microphone, DVD player, Data projector, VGA connection, Computer, Infra red hearing system, Active Panel, Blu Ray, Document Camera, Lecture Capture, Telephone, HDMI Connection, Hearing Assistance Technology', 'Yes', 'Enter the Cornwallis building through the doors by the Octagon. Turn right and go up the stairs. Follow the balcony round to the left; the room is on your right.'),
('Comp SE14', 'CW-Oct', 'Computer Room', 10, 'Data projector, Computer, Active Panel', 'No', 'Enter CW-S via the east doors, turn right and follow the corridor round to the right. The room is ahead on the right. If you enter CW-S via the doors from the carpark outside Cornwallis Central, turn left and follow the corridor and the room will be on your left.'),
('Comp SW101', 'CW-S', 'Classroom', 50, 'Data projector', 'Yes', 'Enter Cornwallis SW (doors closest Gulbenkian, facing Rutherford), take the stairs to the first floor. Go through the doors and turn left. Through the next door follow the corridor right then left and through another door into the south-west wing. The room is first on the left.'),
('Comp SW103', 'CW-S', 'Computer Room', 25, '', 'No', 'Enter Cornwallis SW (doors closest Gulbenkian, facing Rutherford), take the stairs to the first floor. Go through the doors and turn left. Through the next door follow the corridor right then left and through another door into the south-west wing. The room is third on the left.'),
('COPC1(42)', 'CW-Oct', 'Computer Room', 42, 'DVD player, Data projector, VGA connection, Computer, Blu Ray, Lecture Capture, Telephone, HDMI Connection', 'Yes', 'Enter the Cornwallis building through the doors by the Octagon. Turn right and go up the stairs. Follow the balcony round to the left; the room is on your right'),
('CSPC1(27)', 'CW-S', 'Computer Room', 27, 'Data projector, VGA connection, Computer, Lecture Capture, HDMI Connection', 'Yes', 'Enter CW-S through the central (Information Services) doors, turn left and then right, the room is on your left.'),
('KITC', 'CW-S', 'Laboratory', 20, '', 'No', 'KITC'),
('MMLab1', 'CW-NW', 'Language Lab', 36, '', 'No', 'On entering CW-NW go up the stairs to the first floor and turn right. Go through the doors and the room is opposite on the left.'),
('MMLab2', 'CW-NW', 'Language Lab', 24, '', 'No', 'MMLAB2');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `roomdata`
--
ALTER TABLE `roomdata`
  ADD PRIMARY KEY (`RoomID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

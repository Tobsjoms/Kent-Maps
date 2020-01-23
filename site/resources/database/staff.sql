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
-- Table structure for table `staff`
--

CREATE TABLE `staff` (
  `StaffID` varchar(150) NOT NULL,
  `Department` varchar(200) NOT NULL,
  `Name` varchar(200) NOT NULL,
  `Description` varchar(255) NOT NULL,
  `Email` varchar(128) NOT NULL,
  `RoomID` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `staff`
--

INSERT INTO `staff` (`StaffID`, `Department`, `Name`, `Description`, `Email`, `RoomID`) VALUES
('aa2099', 'School Of Computing', 'Adham Albakri', 'Marie Curie Early Stage Researcher', 'A.Albakri@kent.ac.uk', 'Unassigned'),
('aa2167', 'School Of Computing', 'Alberto Aviles Hernandez', 'Research Associate', 'A.Aviles@kent.ac.uk', 'G43'),
('aaf', 'School Of Computing', 'Alex Freitas', 'Professor of Computational Intelligence', 'A.A.Freitas@kent.ac.uk', 'S107'),
('acm55', 'School Of Computing', 'Amy Martindale-Dopson', 'Research Student', 'acm55@kent.ac.uk', 'M3-04A'),
('ad727', 'School Of Computing', 'Aruna Duraisingam', 'Research Student', 'ad727@kent.ac.uk', 'M3-10'),
('akj22', 'School Of Computing', 'Anna Jordanous', 'Senior Lecturer / Stage 1 Year Director (UKM)', 'A.K.Jordanous@kent.ac.uk', 'M3-32'),
('amh58', 'School Of Computing', 'Ayah Helal', 'Research Student', 'amh58@kent.ac.uk', 'M3-10'),
('amk', 'School Of Computing', 'Andy King', 'Professor in Program Analysis', 'A.M.King@kent.ac.uk', 'SW108'),
('aoh3', 'School Of Computing', 'Amin Omid Hajilou', 'Research Student', 'aoh3@kent.ac.uk', 'G43'),
('aoo', 'School Of Computing', 'Amanda Ollier', 'School Administration Manager', 'A.J.Ollier@kent.ac.uk', 'S118'),
('ata', 'School Of Computing', 'Angie Allen', 'Financial Administrator', 'A.T.Allen@kent.ac.uk', 'S116'),
('atna3', 'School Of Computing', 'Adesola Noah Adegboye', 'Research Student', 'atna3@kent.ac.uk', 'M3-10'),
('aw678', 'School Of Computing', 'Adrian Wesek', 'Research Student', 'aw678@kent.ac.uk', 'G43'),
('ba284', 'School Of Computing', 'Budi Arief', 'Senior Lecturer / Director of Innovation', 'B.Arief@kent.ac.uk', 'S111'),
('bb427', 'School Of Computing', 'Ben Barnes', 'Research Associate', 'B.Barnes-427@kent.ac.uk', 'S128B'),
('bgm4', 'School Of Computing', 'Ben Moon', 'Research Student', 'bgm4@kent.ac.uk', 'S115A'),
('cb244', 'School Of Computing', 'Kate Buchan', 'Employability Coordinator', 'C.Buchan@kent.ac.uk', 'G01A'),
('ccw5', 'School Of Computing', 'Crispin Woolnough', 'Building Supervisor', 'C.C.Woolnough@kent.ac.uk', 'G25'),
('cd472', 'School Of Computing', 'Carlos Perez Delgado', 'Lecturer / Library Liaison Officer', 'C.Perez@kent.ac.uk', 'SW15'),
('cd549', 'School Of Computing', 'Cihan Dogan', 'Research Student', 'cd549@kent.ac.uk', 'M3-10'),
('cer28', 'School Of Computing', 'Caio Ribeiro', 'Research Student', 'cer28@kent.ac.uk', 'SW104'),
('cg500', 'School Of Computing', 'Claudia Grigore', 'Research Assistant', 'C.Grigore@kent.ac.uk', 'Unassigned'),
('cgc9', 'School Of Computing', 'Chris Coppins', 'Research Student', 'cgc9@kent.ac.uk', 'SW104'),
('cgj', 'School Of Computing', 'Colin Johnson', 'Reader / Associate Dean of Sciences (Graduate Studies)', 'C.G.Johnson@kent.ac.uk', 'S102'),
('cl339', 'School Of Computing', 'Caroline Li', 'Senior Lecturer / Director of Internationalisation', 'C.Li@kent.ac.uk', 'M3-34'),
('crb34', 'School Of Computing', 'Calvin Brierley', 'Research Student', 'crb34@kent.ac.uk', 'S109A'),
('dab49', 'School Of Computing', 'Daniel Bard', 'Research Student', 'dab49@kent.ac.uk', 'S109B'),
('dao7', 'School Of Computing', 'Dominic Orchard', 'Lecturer / Stage 2 Year Director (UKC)', 'D.A.Orchard@kent.ac.uk', 'SW06'),
('dat', 'School Of Computing', 'David Turner', 'Emeritus Professor of Computation', 'D.A.Turner@kent.ac.uk', 'Unassigned'),
('daw29', 'School Of Computing', 'Daniel Wright', 'Research Student', 'daw29@kent.ac.uk', 'SW12'),
('dfc', 'School Of Computing', 'Dominique Chu', 'Senior Lecturer', 'D.F.Chu@kent.ac.uk', 'SW04'),
('djb', 'School Of Computing', 'David Barnes', 'Senior Lecturer / PGT Admissions Officer', 'D.J.Barnes@kent.ac.uk', 'SW110'),
('dk246', 'School Of Computing', 'Daniel Knox', 'Senior Makerspace Technician', 'D.Knox@kent.ac.uk', 'The Shed'),
('dl2', 'School Of Computing', 'Darren Lissenden', 'Computing Officer', 'D.Lissenden@kent.ac.uk', 'S122A'),
('ds710', 'School Of Computing', 'Daniele Soria', 'Lecturer / Stage 2 Year Director (UKM)', 'D.Soria@kent.ac.uk', 'M3-36'),
('dw341', 'School Of Computing', 'David Waterson', 'Computing Support Lecturer', 'D.Waterson@kent.ac.uk', 'SW08'),
('dwc8', 'School Of Computing', 'David Chadwick', 'Professor of Information Systems Security', 'D.W.Chadwick@kent.ac.uk', 'S131'),
('ea483', 'School Of Computing', 'Enes Altuncu', 'Research Student', 'ea483@kent.ac.uk', 'S115A'),
('ef313', 'School Of Computing', 'Eva Fringi', 'Research Associate', 'E.Fringi@kent.ac.uk', 'M3-21'),
('ejcr', 'School Of Computing', 'Edward Robbins', 'Research Associate', 'E.J.C.Robbins@kent.ac.uk', 'Unassigned'),
('ejh66', 'School Of Computing', 'Edward Hobbs', 'Research Student', 'ejh66@kent.ac.uk', 'SW12'),
('febo', 'School Of Computing', 'Fernando Otero', 'Senior Lecturer / Outreach Coordinator / Deputy Head of School (Medway)', 'F.E.B.Otero@kent.ac.uk', 'M3-29'),
('fl207', 'School Of Computing', 'Farhana Liza', 'Research Student', 'fl207@kent.ac.uk', 'SW104'),
('fs338', 'School Of Computing', 'Francesca Stevens', 'Research Student', 'fs338@kent.ac.uk', 'S115A'),
('fzw', 'School Of Computing', 'Frank Wang', 'Professor of Future Computing', 'F.Z.Wang@kent.ac.uk', 'M3-15'),
('gewt', 'School Of Computing', 'Gerald Tripp', 'Lecturer / Director of Operations / Deputy Head of School (Academic & Teaching)', 'G.E.W.Tripp@kent.ac.uk', 'S108'),
('gm482', 'School Of Computing', 'Guarav Misra', '(KTP) DataScientist Research Associate', 'G.Misra@kent.ac.uk', 'Unassigned'),
('gp208', 'School Of Computing', 'George Parish', 'Research Student', 'gp208@kent.ac.uk', 'SW12'),
('gral2', 'School Of Computing', 'George Langroudi', 'Research Student', 'gral2@kent.ac.uk', 'M3-10'),
('hb5', 'School Of Computing', 'Howard Bowman', 'Professor of Cognition & Logic', 'H.Bowman@kent.ac.uk', 'G44'),
('hf216', 'School Of Computing', 'Hugo Feree', 'Honorary Researcher', 'H.Feree@kent.ac.uk', 'Unassigned'),
('hk324', 'School Of Computing', 'Hrutvik Kanabar', 'Research Student', 'hk324@kent.ac.uk', 'SW12'),
('hln7', 'School Of Computing', 'Huy Le Nguyen', 'Research Student', 'hln7@kent.ac.uk', 'G43'),
('hnlg', 'School Of Computing', 'Helen Godding', 'Undergraduate Student Support Assistant', 'H.N.L.Godding@kent.ac.uk', 'G48'),
('hp300', 'School Of Computing', 'Huy Phan', 'Lecturer / Stage 3 Year Director (UKM)', 'H.Phan@kent.ac.uk', 'M3-38'),
('iau', 'School Of Computing', 'Ian Utting', 'Senior Lecturer / Director of Education', 'I.A.Utting@kent.ac.uk', 'S103'),
('ifj4', 'School Of Computing', 'Fraser James', 'Computing Support Lecturer', 'I.F.James-4@kent.ac.uk', 'SW08'),
('im572', 'School Of Computing', 'Ismail Mohamed', 'Research Student', 'im572@kent.ac.uk', 'M3-04A'),
('jb886', 'School Of Computing', 'James Brookhouse', 'Research Associate', 'J.Brookhouse@kent.ac.uk', 'SW104'),
('jc2005', 'School Of Computing', 'Jacqueline Chetty', 'Lecturer / EDI Representative', 'J.Chetty@kent.ac.uk', 'SW106'),
('jch27', 'School Of Computing', 'Julio Hernandez-Castro', 'Professor', 'J.C.Hernandez-Castro@kent.ac.uk', 'S120'),
('jdj9', 'School Of Computing', 'Joel Jakubovic', 'Research Student', 'jdj9@kent.ac.uk', 'S115A'),
('jec', 'School Of Computing', 'Janet Carter', 'Senior Lecturer / Director of Undergraduate Studies / Senior Tutor (Canterbury) / Chief Examiner UG', 'J.E.Carter@kent.ac.uk', 'S104'),
('jf330', 'School Of Computing', 'Jakub Fil', 'Research Student', 'jf330@kent.ac.uk', 'G43'),
('jgj', 'School Of Computing', 'Janine Jarvis', 'Student Experience Officer', 'J.G.Jarvis@kent.ac.uk', 'M3-30'),
('jjm20', 'School Of Computing', 'Jason Marshall', 'KITC Business Manager', 'J.J.Marshall@kent.ac.uk', 'G02'),
('jjp31', 'School Of Computing', 'Jamie Pont', 'Research Student', 'jjp31@kent.ac.uk', 'S109A'),
('jks31', 'School Of Computing', 'Joanna Sharrad', 'Research Student', 'jks31@kent.ac.uk', 'SW104'),
('jl703', 'School Of Computing', 'Julien Lange', 'Lecturer / Advanced MSc Programme Director (UKC)', 'J.S.Lange@kent.ac.uk', 'SW13'),
('joh6', 'School Of Computing', 'Jack Hughes', 'Research Student', 'joh6@kent.ac.uk', 'S115A'),
('jrcn', 'School Of Computing', 'Jason Nurse', 'Lecturer', 'J.R.C.Nurse@kent.ac.uk', 'S112'),
('jrh38', 'School Of Computing', 'Jessica Hudson', 'Student Experience Manager', 'J.Hudson@kent.ac.uk', 'G46'),
('jrh53', 'School Of Computing', 'Joseph Harrison', 'Research Student', 'jrh53@kent.ac.uk', 'SW104'),
('jrh54', 'School Of Computing', 'Joseph Harrison', 'Research Associate', 'J.R.Harrison@kent.ac.uk', 'SW104'),
('js959', 'School Of Computing', 'Jie Shao', 'Computing Support Lecturer', 'J.Shao-959@kent.ac.uk', 'SW08'),
('jt307', 'School Of Computing', 'Julie Teulings', 'PA to Head of School & SAM', 'J.Teulings@kent.ac.uk', 'S116'),
('kg249', 'School Of Computing', 'Keith Greenhow', 'Makerspace Technician', 'K.Greenhow@kent.ac.uk', 'The Shed'),
('kh468', 'School Of Computing', 'Kathryn Harris', 'Research Student', 'kh468@kent.ac.uk', 'G43'),
('kik', 'School Of Computing', 'Konstantin Kapinchev', 'Assistant Lecturer', 'K.Kapinchev@kent.ac.uk', 'Unassigned'),
('kp356', 'School Of Computing', 'Konstantinos Patlatzoglou', 'Research Student', 'kp356@kent.ac.uk', 'M3-04a'),
('ksj5', 'School Of Computing', 'Keenan Jones', 'Research Student', 'ksj5@kent.ac.uk', 'S109A'),
('kv', 'School Of Computing', 'Katie Van Sanden', 'Industrial Placement Coordinator', 'K.Van-Sanden@kent.ac.uk', 'G01B'),
('la269', 'School Of Computing', 'Lucy Ashbey', 'Taught Postgraduate Student Support Assistant', 'L.Ashbey@kent.ac.uk', 'G48'),
('la309', 'School Of Computing', 'Laila Alterkawi', 'Research Student', 'la309@kent.ac.uk', 'M3-10'),
('lb514', 'School Of Computing', 'Laura Bocchi', 'Senior Lecturer / PGR Admissions Officer', 'L.Bocchi@kent.ac.uk', 'SW16'),
('lb732', 'School Of Computing', 'Lisa Bonheme', 'Research Student', 'lb732@kent.ac.uk', 'S115A'),
('ldp7', 'School Of Computing', 'Lam Pham', 'Research Student', 'ldp7@kent.ac.uk', 'M3-10'),
('lh558', 'School Of Computing', 'Lee Harris', 'Research Student', 'lh558@kent.ac.uk', 'SW12'),
('lk339', 'School Of Computing', 'Lucy Korzeniowska', 'Reception & Course Admin Assistant', 'L.Korzeniowska@kent.ac.uk', 'G48'),
('lmd36', 'School Of Computing', 'Lisa Davies', 'Assistant Lecturer', 'L.M.Davies@kent.ac.uk', 'Unassigned'),
('lw476', 'School Of Computing', 'Liqun Wu', 'Research Student', 'lw476@kent.ac.uk', 'M3-04A'),
('mcw', 'School Of Computing', 'Mark Wheadon', 'Senior Computing Fellow', 'M.C.Wheadon@kent.ac.uk', 'S122'),
('mg483', 'School Of Computing', 'Marek Grzes', 'Lecturer / Stage 3 Year Director (UKC)', 'M.Grzes@kent.ac.uk', 'S128C'),
('mh453', 'School Of Computing', 'Martyn Hambrook', 'Caretaker', 'M.Hambrook@kent.ac.uk', 'G25'),
('mim', 'School Of Computing', 'Mohamad Imad Mahaini', 'Research Associate', 'M.I.Mahaini@kent.ac.uk', 'SW104'),
('mjb211', 'School Of Computing', 'Mark Batty', 'Senior Lecturer', 'M.J.Batty@kent.ac.uk', 'SW10'),
('mk451', 'School Of Computing', 'Michael Kampouridis', 'Lecturer / Director of Graduate Studies (Taught) / Chief Examiner PGT / Advanced MSc Programme Director (UKM)', 'M.Kampouridis@kent.ac.uk', 'M3-35'),
('mm53', 'School Of Computing', 'Matteo Migliavacca', 'Senior Lecturer', 'M.Migliavacca@kent.ac.uk', 'M3-37'),
('mm983', 'School Of Computing', 'Mohamad Imad Mahaini', 'Research Student', 'mm983@kent.ac.uk', 'SW104'),
('mn361', 'School Of Computing', 'Mahan Hosseini', 'Research Student', 'mn361@kent.ac.uk', 'G43'),
('mp612', 'School Of Computing', 'Marco Paviotti', 'Research Associate', 'M.Paviotti@kent.ac.uk', 'SW12'),
('mpsm', 'School Of Computing', 'Matthew Mukalere', 'Research Assistant', 'M.P.S.Mukalere@kent.ac.uk', 'S109A'),
('msj', 'School Of Computing', 'Shoaib Jameel', 'Lecturer', 'M.S.Jameel@kent.ac.uk', 'M3-16'),
('nd315', 'School Of Computing', 'Nicolas Dilley', 'Research Student', 'nd315@kent.ac.uk', 'SW12'),
('oa354', 'School Of Computing', 'Osama Abu Oun', 'Research Associate', 'O.Abu-Oun@kent.ac.uk', 'S109A'),
('oc', 'School Of Computing', 'Olaf Chitil', 'Lecturer / UG Admissions Officer (Canterbury)', 'O.Chitil@kent.ac.uk', 'S129'),
('opg', 'School Of Computing', 'Orla Garratt', 'Marketing and Communications Manager', 'O.P.Garratt@kent.ac.uk', 'G01A'),
('pbl2', 'School Of Computing', 'Peter Lloyd', 'Research Student', 'pbl2@kent.ac.uk', 'SW12'),
('pfl', 'School Of Computing', 'Peter Linington', 'Emeritus Professor of Computer Communication', 'P.F.Linington@kent.ac.uk', 'Unassigned'),
('pgk', 'School Of Computing', 'Peter Kenny', 'Senior Lecturer', 'P.G.Kenny@kent.ac.uk', 'S128'),
('phw', 'School Of Computing', 'Peter Welch', 'Emeritus Professor of Parallel Computing', 'P.H.Welch@kent.ac.uk', 'Unassigned'),
('pjr', 'School Of Computing', 'Peter Rodgers', 'Professor of Visual Computing / Director of Research / Deputy Head of School', 'P.J.Rodgers@kent.ac.uk', 'SW107'),
('pr254', 'School Of Computing', 'Palaniappan Ramaswamy', 'Reader / UG Admissions Officer (Medway)', 'R.Palani@kent.ac.uk', 'M3-31'),
('ps564', 'School Of Computing', 'Piotr Sawicki', 'Research Student', 'ps564@kent.ac.uk', 'SW104'),
('ra545', 'School Of Computing', 'Robin Ayling', 'Research Student', 'ra545@kent.ac.uk', 'S115A'),
('rb724', 'School Of Computing', 'Rahime Belen-Saglam', 'Research Associate', 'R.Belen-Saglam-724@kent.ac.uk', 'S109B'),
('rdl', 'School Of Computing', 'Rogrio de Lemos', 'Senior Lecturer', 'R.Delemos@kent.ac.uk', 'S106'),
('rej', 'School Of Computing', 'Richard Jones', 'Head of School / Professor of Computer Systems', 'R.E.Jones@kent.ac.uk', 'S117'),
('rg399', 'School Of Computing', 'Radu Grigore', 'Senior Lecturer / Conversion MSc Programme Director', 'R.Grigore@kent.ac.uk', 'SW07'),
('rji4', 'School Of Computing', 'Riku Ihalainen', 'Research Student', 'rji4@kent.ac.uk', 'M3-04a'),
('rl348', 'School Of Computing', 'Rebecca Lloyds', 'KITC Project Coordinator', 'R.Lloyds@kent.ac.uk', 'G02'),
('rnsr', 'School Of Computing', 'Reuben Rowe', 'Honorary Researcher', 'R.N.S.Rowe@kent.ac.uk', 'Unassigned'),
('rok', 'School Of Computing', 'zgr Kafal', 'Lecturer / Ethics Officer', 'R.O.Kafali@kent.ac.uk', 'SW05'),
('saf', 'School Of Computing', 'Sally Fincher', 'Professor of Computing Education / Director of Graduate Studies  Research / Year in Computing (Autumn)', 'S.A.Fincher@kent.ac.uk', 'S101'),
('sao', 'School Of Computing', 'Scott Owens', 'Reader', 'S.A.Owens@kent.ac.uk', 'SW09'),
('secw2', 'School Of Computing', 'Samuel Williams', 'Research Student', 'secw2@kent.ac.uk', 'Unassigned'),
('seh53', 'School Of Computing', 'Sarah Harris', 'Research Assistant', 'S.E.Harris@kent.ac.uk', 'SW104'),
('sgd6', 'School Of Computing', 'Sam Dawson', 'Research Student', 'sgd6@kent.ac.uk', 'SW12'),
('sjc205', 'School Of Computing', 'Simon Cooksey', 'Research Student', 'sjc205@kent.ac.uk', 'SW12'),
('sjm88', 'School Of Computing', 'Sadie Macintyre', 'Research Student', 'sjm88@kent.ac.uk', 'SW104'),
('sjt', 'School Of Computing', 'Simon Thompson', 'Professor of Logic and Computation', 'S.J.Thompson@kent.ac.uk', 'SW109'),
('sk755', 'School Of Computing', 'Sophie Kaleba', 'Research Student', 'sk755@kent.ac.uk', 'S115A'),
('sl626', 'School Of Computing', 'Shujun Li', 'Professor of Cyber Security', 'S.J.Li@kent.ac.uk', 'S105'),
('sm2163', 'School Of Computing', 'Surej Mouli', 'Research Associate', 'S.Mouli@kent.ac.uk', 'M3-21'),
('sm951', 'School Of Computing', 'Stefan Marr', 'Lecturer / Stage 1 Year Director (UKC)', 'S.Marr@kent.ac.uk', 'SW14'),
('smk', 'School Of Computing', 'Stefan Kahrs', 'Lecturer / Exams Officer', 'S.M.Kahrs@kent.ac.uk', 'SW105'),
('so358', 'School Of Computing', 'Sergey Ovchinnik', 'Research Student', 'so358@kent.ac.uk', 'M3-10'),
('sr309', 'School Of Computing', 'Sin Robson', 'Industrial Placements Coordinator', 'S.Robson@kent.ac.uk', 'G01B'),
('srk21', 'School Of Computing', 'Stephen Kell', 'Lecturer', 'S.R.Kell@kent.ac.uk', 'S130'),
('StaffID', 'Department', 'Name', 'Description', 'Email', 'RoomID'),
('sv39', 'School Of Computing', 'Sonnary Dearden', 'Research Student Support Coordinator', 'S.Dearden@kent.ac.uk', 'G47'),
('svh22', 'School Of Computing', 'Shannon Croft', 'Student Administration Assistant', 'S.V.Croft@kent.ac.uk', 'M3-30'),
('ta541', 'School Of Computing', 'Tom Alvey', 'Research Assistant', 'T.Alvey@kent.ac.uk', 'S109A'),
('td207', 'School Of Computing', 'Theodosios Dimitrakos', 'Professor of Computer Science', 'T.Dimitrakos@kent.ac.uk', 'S128B'),
('tdb', 'School Of Computing', 'Tim Bishop', 'Computing Officer', 'T.D.Bishop@kent.ac.uk', 'S122A'),
('ti69', 'School Of Computing', 'Tasmina Islam', 'Research Associate', 'T.Islam@kent.ac.uk', 'S109B'),
('tj202', 'School Of Computing', 'Tobias Jordan', 'Research Student', 'tj202@kent.ac.uk', 'Unassigned'),
('tk243', 'School Of Computing', 'Tomas Kalibera', 'Honorary Research Fellow', 'T.Kalibera@kent.ac.uk', 'Unassigned'),
('tmac3', 'School Of Computing', 'Theophile Champion', 'Research Student', 'tmac3@kent.ac.uk', 'SW104'),
('tp343', 'School Of Computing', 'Tomas Petricek', 'Lecturer', 'T.Petricek@kent.ac.uk', 'S129A'),
('tp346', 'School Of Computing', 'Tossapol Pomsuwan', 'Research Student', 'tp346@kent.ac.uk', 'G43'),
('trh', 'School Of Computing', 'Tim Hopkins', 'Emeritus Reader in Numerical Computing', 'T.R.Hopkins@kent.ac.uk', 'Unassigned'),
('ts495', 'School Of Computing', 'Thomas Seed', 'Research Student', 'ts495@kent.ac.uk', 'Unassigned'),
('tt340', 'School Of Computing', 'Timotej Tomandl', 'Research Student', 'tt340@kent.ac.uk', 'SW12'),
('vf200', 'School Of Computing', 'Virginia Franqueira', 'Lecturer', 'V.Franqueira@kent.ac.uk', 'S121'),
('vl200', 'School Of Computing', 'Vilem-Benjamin Liepelt', 'Research Student', 'vl200@kent.ac.uk', 'SW11'),
('wrj2', 'School Of Computing', 'William Jones', 'Research Student', 'wrj2@kent.ac.uk', 'SW12'),
('wz84', 'School Of Computing', 'Wenbo Zhang', 'Research Student', 'wz84@kent.ac.uk', 'SW12'),
('xm39', 'School Of Computing', 'Xiaoxiao Miao', 'Research Student', 'xm39@kent.ac.uk', 'M3-10'),
('yd46', 'School Of Computing', 'Yun Deng', 'Research Student', 'yd46@kent.ac.uk', 'SW08'),
('yh', 'School Of Computing', 'Yang He', 'Lecturer / Senior Tutor (Medway)', 'Y.He@kent.ac.uk', 'M3-33'),
('yl339', 'School Of Computing', 'Yuzhou Lin', 'Research Student', 'yl339@kent.ac.uk', 'M3-04a'),
('yl360', 'School Of Computing', 'Yang Lu', 'Research Associate', 'Y.Lu@kent.ac.uk', 'S109B');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `staff`
--
ALTER TABLE `staff`
  ADD PRIMARY KEY (`StaffID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

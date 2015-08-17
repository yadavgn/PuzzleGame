-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Aug 17, 2015 at 01:39 PM
-- Server version: 5.6.21
-- PHP Version: 5.6.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `pressdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `orderdetail`
--

CREATE TABLE IF NOT EXISTS `orderdetail` (
`ID` int(11) NOT NULL,
  `PickupDate` date NOT NULL,
  `PickupTime` text NOT NULL,
  `OrderDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `CustomerID` int(11) NOT NULL,
  `Status` varchar(10) NOT NULL DEFAULT 'New',
  `UpdatedOn` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=166 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `userdetails`
--

CREATE TABLE IF NOT EXISTS `userdetails` (
`userID` int(4) NOT NULL,
  `name` varchar(50) NOT NULL,
  `address1` varchar(100) NOT NULL,
  `address2` varchar(100) NOT NULL,
  `address3` varchar(100) NOT NULL,
  `email` varchar(50) NOT NULL,
  `lastname` varchar(20) NOT NULL,
  `mobile` varchar(11) NOT NULL,
  `CreatedOn` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedOn` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `IsDeleted` binary(2) NOT NULL,
  `DeletedOn` date NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=96 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `userdetails`
--

INSERT INTO `userdetails` (`userID`, `name`, `address1`, `address2`, `address3`, `email`, `lastname`, `mobile`, `CreatedOn`, `UpdatedOn`, `IsDeleted`, `DeletedOn`) VALUES
(92, 'Ghanshyam', 'test', 'test2', 'testas d', 'sadfkjasd fkaslk faskdf', 'Yadav', '9158880621', '2015-08-17 16:36:43', '2015-08-17 16:36:43', 0x0000, '0000-00-00'),
(93, 'Ghanshyam', 'test', 'test2', 'testas d', 'sadfkjasd fkaslk faskdf', 'Yadav', '0', '2015-08-17 16:36:48', '2015-08-17 16:36:52', 0x0000, '0000-00-00'),
(94, 'Ghanshy', 'test', 'test2', 'testas d', 'sadfkjasd fkaslk faskdf', 'Yadav', '0', '2015-08-17 16:37:57', '2015-08-17 16:38:49', 0x0000, '0000-00-00'),
(95, 'Ghanshy', 'test', 'test2', 'testas d', 'sadfkjasd fkaslk faskdf', 'Yadav', '0', '2015-08-17 17:08:58', '2015-08-17 17:09:07', 0x0000, '0000-00-00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `orderdetail`
--
ALTER TABLE `orderdetail`
 ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `userdetails`
--
ALTER TABLE `userdetails`
 ADD PRIMARY KEY (`userID`), ADD UNIQUE KEY `userID` (`userID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `orderdetail`
--
ALTER TABLE `orderdetail`
MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=166;
--
-- AUTO_INCREMENT for table `userdetails`
--
ALTER TABLE `userdetails`
MODIFY `userID` int(4) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=96;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

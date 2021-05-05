ALTER TABLE admission AUTO_INCREMENT = 1;
ALTER TABLE answer AUTO_INCREMENT = 1;
ALTER TABLE choice AUTO_INCREMENT = 1;
ALTER TABLE diaryentry AUTO_INCREMENT = 1;
ALTER TABLE fall AUTO_INCREMENT = 1;
ALTER TABLE patient AUTO_INCREMENT = 1;
ALTER TABLE patientlogin AUTO_INCREMENT = 1;
ALTER TABLE question AUTO_INCREMENT = 1;
ALTER TABLE researcher AUTO_INCREMENT = 1;
ALTER TABLE researcherlogin AUTO_INCREMENT = 1;

CALL createResearcher(1111111304, 'juicy499', '$2y$10$CyaDLe4IsEZvR.VnYCiYquOqVVNseUGmn7TQBiuLf.TVOt76vJCQK', 'Virgen', 'Locascio', '01752123999', '+447849198656', 'juicy499@gmail.com');

CALL createResearcher(1111111305, 'strengthen255', '$2y$10$gkLcPYpyZJAIOd..zQKiEOgVlPEU486fw5RRjXZWuClpgMCF7oVxy', 'Barabara', 'Bently', '01752123999', '+447849198656', 'strengthen255@gmail.com');

CALL createResearcher(1111111306, 'zesty328', '$2y$10$hZ2XFoiHczQbTml69zTkjOvJj7RxJ1yv8MHBO./90LVnqcyJwTXca', 'Marcell', 'Negron', '01752123999', '+447849198656', 'zesty328@gmail.com');

CALL createResearcher(1111111307, 'general567', '$2y$10$iVJKNiJwC0c0WU71zeQlyuDqYAkjk1BV6A7wwBRlT0tXIvOkhHF.i', 'Debby', 'Gattison', '01752123999', '+447849198656', 'general567@gmail.com');

CALL createResearcher(1111111308, 'seal900', '$2y$10$7fTmqrhj6anIXf2UICTp8.c3MBf1VEfUtdCtgJlg12Oi2Khv0Gyte', 'Herb', 'Anchondo', '01752123999', '+447849198656', 'seal900@gmail.com');

CALL createResearcher(1111111309, 'lumpy75', '$2y$10$BWlmGnd9Qudiu8rgpBvzLeu0JpqeyoZxI0hw2tpWoPkLt9DG7eu.m', 'Alana', 'Guerin', '01752123999', '+447849198656', 'lumpy75@gmail.com');

CALL createResearcher(1111111310, 'aromatic572', '$2y$10$UYa9vAdTBimoslrjDv92LO/sgAxDLuJab.CFMickl.1qiXkwiBA6O', 'Deloras', 'Lueras', '01752123999', '+447849198656', 'aromatic572@gmail.com');

CALL createResearcher(1111111311, 'agree201', '$2y$10$yaXA1D5dRoYo/AZgcmhS/.13BE7wviXw.X1f6Fkct.SR0ye3fd.T.', 'Barbara', 'Blank', '01752123999', '+447849198656', 'agree201@gmail.com');

CALL createResearcher(1111111312, 'scattered877', '$2y$10$s1Uhr63n8Nxu1SrmB0SCNOM5/G9NYt5uzCz4tRX0yIBg.OcYtAcsK', 'Akilah', 'Commons', '01752123999', '+447849198656', 'scattered877@gmail.com');

CALL createResearcher(1111111313, 'sloppy833', '$2y$10$TDOpsrup81rz92Yo8J81/uDqnC4cJdLrYVUbM/LkjNCfkHJ4q0PHS', 'Virgilio', 'Louis', '01752123999', '+447849198656', 'sloppy833@gmail.com');

CALL createPatient(1, 1111111113, 'maureenW38', '$2y$10$4i1wX1luP2ScgZGoTLaBZObRGIVipHjgyOyZutvz2Q42p4CADHWrS', 'Maureen', 'Ward', '1963/02/25 20:00:00', '0 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'maureenW38@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111114, 'irate259', '$2y$10$vwtpMEcIMboEq6fL0kaUbOhk0yU4TXoYEHwQywrsmIzzCBE8VG482', 'Mckenzie', 'Cap', '1950/06/22 10:00:00', '1 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'irate259@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111115, 'rambunctious322', '$2y$10$5epEF8Jn8iuabZsEbWQuFeDfXGu45j.z94npFO8uybdokmkHgeY1m', 'Larue', 'Simeon', '1945/05/16 00:00:00', '2 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'rambunctious322@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111116, 'drip203', '$2y$10$Ti2tEfdfBT3vOq2q8aDD4OeaUq0ieet5BTZbP5AIGagtQIwqHRCMC', 'Nicholle', 'Gossard', '1949/12/12 11:00:00', '3 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'drip203@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111117, 'crooked119', '$2y$10$DBF.bb9fgRx7vt8mMzEjMe3DhAANFYfz2H6f8U.2fNbvrcMUHphf2', 'Jeannie', 'Bucker', '1955/07/9 07:00:00', '4 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'crooked119@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111118, 'form129', '$2y$10$QE76G8nuozYmqXfsluop5OUQCVJ3Lchf.E56BBphkFc/UDXKLTg26', 'Christinia', 'Unrein', '1976/11/12 08:00:00', '5 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'form129@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111119, 'crazy507', '$2y$10$56yl.eGfsL5RfrQZbe/l7.5.CaWB5j5ssoWpeoqsUVdPJf1ZTAGT2', 'Odelia', 'Brooks', '1942/07/22 01:00:00', '6 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'crazy507@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111120, 'scientific821', '$2y$10$4lsvsMWZnVVsG.r4kcZr/.0BHqG8FYrgJQQV70KKrj7ByQPZ3Tldi', 'Suellen', 'Gehling', '1996/08/4 16:00:00', '7 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'scientific821@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111121, 'acoustics128', '$2y$10$65beg9Gva4cUDKMVVkQ.O.Yeg279oS4lFAcHuU8ktJuwYQR4M5t6S', 'Maris', 'Vandermolen', '1990/07/6 22:00:00', '8 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'acoustics128@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111122, 'suit626', '$2y$10$XZ2AuFv5GAYOGCyKmdSxL.YoYW8akB3KdDIF1HiIU3lcmPZmnGqQy', 'Wyatt', 'Brawner', '1952/01/2 08:00:00', '9 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'suit626@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111123, 'weary262', '$2y$10$EkU5M/KAn6QwRhUXfgP9yu8gfh.QFB3vbliRo.IyJSn4chYR.jgYi', 'Terese', 'Pina', '1940/06/25 21:00:00', '10 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'weary262@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111124, 'tan612', '$2y$10$uASBbuNSmEU2EssRwgUge.TsTRQk185YZrv1v58wDdUsPcMLJPGbC', 'Andrea', 'Collinson', '1986/03/1 20:00:00', '11 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'tan612@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111125, 'torpid491', '$2y$10$L6QfMZyydBHPcGCyJL6NqOLcHqG45Yt4YxZbgJgAzNQvut6bvHbkq', 'Armanda', 'Rogowski', '1959/09/2 18:00:00', '12 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'torpid491@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111126, 'cycle377', '$2y$10$KVyTANLhKhTelEeqmy.2NOZJgL.lZM62CsOsI8ErLB5IBlnM7pwXq', 'Hilton', 'Hearns', '2000/04/4 21:00:00', '13 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'cycle377@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111127, 'like194', '$2y$10$/zE5vRfvsnhA5hdCdKFKaO/LDthiHLD35r3P/bJYH1G5UlygMAEvm', 'Tyesha', 'Dicus', '1961/04/15 02:00:00', '14 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'like194@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111128, 'spark673', '$2y$10$c3WhiGoZ80NVrT/QvX28JuXy/qK9/j8dCj0HAA/ZBMG.IOcCG2buC', 'Tuyet', 'Weary', '1963/06/23 22:00:00', '15 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'spark673@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111129, 'jellyfish317', '$2y$10$pX9F7bUfWMYQwzLKqLA62.9ueSQYOG3bzyUNZoWHNj5sp.17ipp5q', 'Nikki', 'Giel', '1986/05/25 04:00:00', '16 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'jellyfish317@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111130, 'incredible186', '$2y$10$PHxuJ4qS2V07Yr0aUfwYvORGtxD7y7XHmNp/fadAsmnRBy9arb/V.', 'Magen', 'Gerling', '1963/11/15 19:00:00', '17 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'incredible186@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111131, 'steep673', '$2y$10$31PHZmoYHAPSc8csySBeNOkiDJ1PUXpqtULSJOS2MovLs9srrJCr6', 'Ayana', 'Labonte', '1997/11/27 04:00:00', '18 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'steep673@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111132, 'degree17', '$2y$10$if8IsW3v.zceeenLFYVzseHVqi4K.TbDaBjkltAxgVtN3ajDAYSBi', 'Marhta', 'Masi', '1988/03/27 08:00:00', '19 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'degree17@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111133, 'duck488', '$2y$10$mXL0UGczX2aqstcRp1iWJuW925r6zjPYASsbpx/ai0hHi3wIPeGfu', 'Luanne', 'Litton', '1942/06/11 11:00:00', '20 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'duck488@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111134, 'deserted743', '$2y$10$l9DXpSXJ.FWluCeDTxjgze./QVmh1ymc7RKjHmx/IOebGCZO0zboG', 'Amal', 'Torgeson', '1942/02/2 07:00:00', '21 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'deserted743@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111135, 'bell998', '$2y$10$f4BJjyfy3mcCC/eGBT2UouTuHDU5oVSMx2GpZikuoF8b71YStnCt6', 'Jacques', 'Hendryx', '1964/06/16 11:00:00', '22 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'bell998@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111136, 'fragile80', '$2y$10$abvHsXe3ShWV4U2uDN.2zO9Yzfm/23rsqaFzkQWJ/Ot3KQkF.6s6.', 'Lorinda', 'Hoerr', '1952/04/17 04:00:00', '23 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'fragile80@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111137, 'school477', '$2y$10$DnSLISzmZlVsyALjo3wwWei1QjAZBmMQn4u7j5xy8UYecsWqBvg/2', 'Alexandra', 'Hendrixson', '1997/07/25 06:00:00', '24 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'school477@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111138, 'classy384', '$2y$10$DMdeKfleFChnLL6Z.dUaquUhWDsivsUikPZiGdvBD8zrhaWSXGcom', 'Lashaun', 'Buice', '1942/10/12 23:00:00', '25 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'classy384@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111139, 'grateful651', '$2y$10$oiGlLZxQW86XJ1Yd0GqE5.nUMX4FGdRtlHLhDI7Sbo1KAGhryrn/a', 'Shondra', 'Eells', '1979/06/12 11:00:00', '26 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'grateful651@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111140, 'soak972', '$2y$10$N3.eZCm0pmuMZXw2MlZDLucR5LKFRQdbdinX9o/t1R/2NJstKR986', 'Russell', 'Haro', '1989/03/23 15:00:00', '27 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'soak972@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111141, 'hose733', '$2y$10$2j4wAbDa0T/Y6JX7IMRX7.ZbwaXcKjfpTrCtiM9IxI/KH2GVRcdey', 'Merry', 'Chmielewski', '1988/02/4 20:00:00', '28 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'hose733@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111142, 'fry49', '$2y$10$JU4AsF8CtK6AnbSonZRQCexEdQov6JjfShHB6.M459rmLmFXxMe1O', 'Anastasia', 'Prado', '1945/07/20 12:00:00', '29 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'fry49@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111143, 'lopsided898', '$2y$10$cK5MwHseGicpyJmCDyf4H.Kf/ULt6gpBJ0I7NWN083AIIsqRdOaeq', 'Shirlee', 'Rossiter', '1958/11/16 07:00:00', '30 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'lopsided898@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111144, 'superb170', '$2y$10$SQe0rbmSHzP6aJzu4bIDhOKupovnFruEKwzNeAM7Bz57xr47I9dZW', 'Sunny', 'Vanbuskirk', '1970/09/19 11:00:00', '31 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'superb170@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111145, 'bake489', '$2y$10$Q6qVYlVfLtPkocBrmjK8mua30w5D1IlX6B2dYERdP5/uscSXzmV12', 'Natisha', 'Leonardi', '1955/01/1 19:00:00', '32 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'bake489@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111146, 'first697', '$2y$10$PFV7NKvop2xLitKGOtPkF.X6DU90iENh/B4iyGtkROXjENU5uqhg2', 'Juliana', 'Bacchus', '1971/04/11 12:00:00', '33 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'first697@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111147, 'bounce394', '$2y$10$s1W7mQS3Wwg3OeHtHgQlYe9.1.0XWPoRlFpqt7xwgpfuFLLL32wxy', 'Alissa', 'Landi', '1951/09/3 05:00:00', '34 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'bounce394@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111148, 'incompetent558', '$2y$10$QkqdzNWxve3hkDNKiPsucOVOiXXYF528duAYSv8R1icsuOtrhf/ua', 'Amina', 'Gaona', '1980/03/28 11:00:00', '35 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'incompetent558@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111149, 'multiply44', '$2y$10$RFCf68mr2pJ6k4ewoIwny.wQagooYfgRa6c9GOQf2xKCyiTESrO1S', 'Leonila', 'Ransdell', '1945/01/13 07:00:00', '36 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'multiply44@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111150, 'tie716', '$2y$10$ZhivEoMEQQM1UfOFIsuDse8zacchiuiBxuY/B9zACIuv2JTmu5.O6', 'Bernarda', 'Sandefur', '2002/10/27 00:00:00', '37 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'tie716@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111151, 'adorable572', '$2y$10$B4AHn1mSyIv4jP6C37OXLOhedxm4zWIe7qg.FSOgrfXVUgnNm1I..', 'Gretchen', 'Jorge', '1944/02/4 05:00:00', '38 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'adorable572@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111152, 'pipe946', '$2y$10$uLjxImiV5E9h5S.WHOVrUurX.gX5z/eBY45oYtE.EH3YcmC.ZOO0S', 'Dudley', 'Pratts', '1963/02/12 19:00:00', '39 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'pipe946@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111153, 'carriage978', '$2y$10$Xv1Qsw0JGc0yvCO0NDNKeOUcR5.YWmnd5e43fSMyWVjaVlKhIrwim', 'Caleb', 'Prejean', '1979/10/15 15:00:00', '40 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'carriage978@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111154, 'ill295', '$2y$10$qHwGct7L2l2F5T8GOElKS.0Edbme3KPsXYWBWh.3CyhkoVlccl8Fy', 'Mia', 'Drown', '1977/10/13 16:00:00', '41 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'ill295@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111155, 'boiling921', '$2y$10$LP0owNSKNkgZTE7g8kg6Wedxh6sKGHwrq1wqpniHFD7yW2dtvf9KG', 'Sheron', 'Segundo', '1994/03/18 00:00:00', '42 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'boiling921@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111156, 'rebel948', '$2y$10$X06ufYBPxw7jCfbLkDCS5uRiFFb3nJ0ggfhHBwffOlnL/p4PMd8c6', 'Pauletta', 'Weckerly', '1974/08/17 08:00:00', '43 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'rebel948@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111157, 'aunt102', '$2y$10$FQBduAA2byLzu7u8WYimCu6r2i4TlZF.3l6PH8evtqHQchVKX3gNO', 'Alfreda', 'Felton', '1952/04/22 17:00:00', '44 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'aunt102@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111158, 'acceptable210', '$2y$10$2DZcLlvUD1IzWq0VnizmHuQnqnqCy4Su9Zm8NiDxsyMdIzzFoEA3G', 'Lexie', 'Janicki', '1947/05/16 01:00:00', '45 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'acceptable210@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111159, 'psychotic936', '$2y$10$jUTP3xaONsngeI.HlBaVc.LWKIJ6EzRmEMeuCSqFeCByQRHzz/aq6', 'Ferne', 'Woodward', '1951/07/25 03:00:00', '46 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'psychotic936@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111160, 'inject594', '$2y$10$F8xClR4rB2kZeEqTrS8eeeOt1hsqP84O5URQFww/jxfh2/jSQSgNq', 'Grisel', 'Garibay', '1970/09/27 08:00:00', '47 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'inject594@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111161, 'mysterious316', '$2y$10$QbOlP9lEzmHKgiHAMty/JeHnHvhXXg3JTcueceKU6Rw98kP00es8.', 'Tonie', 'Cheatam', '1987/05/5 14:00:00', '48 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'mysterious316@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111162, 'hill860', '$2y$10$0IiGIUtKn27JnS43jJ41k.Y.39FPamiLquyz5F8AttECzQARx3hLm', 'Gordon', 'Valadez', '1962/01/17 11:00:00', '49 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'hill860@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111163, 'nauseating332', '$2y$10$SWcY2rybW4elqv.wLsuIqeR58v2Rz2vQEj81dhdiXtwwJTNWy.Iu6', 'Cira', 'Poling', '1966/05/2 21:00:00', '50 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'nauseating332@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111164, 'terrible777', '$2y$10$OKlB9fpZrqXfsQYeT5Zw9Op5PjB29WUBTI0Jm.EWyj1FtaVnjuolG', 'Terrilyn', 'Mom', '1949/05/2 10:00:00', '51 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'terrible777@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111165, 'amount25', '$2y$10$VHmMvMVHb2l/CIgJ28SE9eMwVa5q5I8i/SJ5PIQC.3xClobIp9Z3i', 'Livia', 'Westman', '1978/02/27 09:00:00', '52 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'amount25@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111166, 'selective648', '$2y$10$TqsfjzY4LKukDt/Mf1g0OOS4dw6ayRaq.aJ7RlDzBS0cixyylwn6K', 'Chana', 'Wendling', '1991/03/12 19:00:00', '53 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'selective648@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111167, 'tiger634', '$2y$10$yVBhtIU6PNIwsuvlBIP.2.Qi/KBgghnw7xrBD5E8QjI49mgZ2B..q', 'Shyla', 'Altamirano', '1941/08/10 13:00:00', '54 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'tiger634@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111168, 'rake516', '$2y$10$3BIlbfA6LBIQr38qmsmCSOnK7xiXcp.hH2XFfwrjjktCnXTpCG0Q6', 'Branden', 'Dobbins', '1975/08/24 09:00:00', '55 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'rake516@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111169, 'frightening557', '$2y$10$3gGtSkVRnN5kR/REbH2kB.hHWpHBMmljEI0w562aiWUscYIN96132', 'Warren', 'Lizaola', '1993/07/13 18:00:00', '56 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'frightening557@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111170, 'stir531', '$2y$10$ApWyeFBI4bWpfkZfXYGWf.wSMONVHtx83qzH0GLtp5SBOpObj8eri', 'Octavio', 'Masden', '1965/06/24 00:00:00', '57 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'stir531@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111171, 'proud391', '$2y$10$ixDRpxUg1S/cHFR6aMGenegrPqeBEuq.fs3PIHhRDcH/qH0OvXt7G', 'Nancee', 'Litz', '1991/03/2 04:00:00', '58 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'proud391@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111172, 'skillful417', '$2y$10$RB/SSNX.eoffmWidGm/tcuX9jXNf3Y7Kjtz8fI/GfQt7gYzgkmdqC', 'Clarinda', 'Marcinko', '1985/03/26 09:00:00', '59 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'skillful417@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111173, 'lackadaisical956', '$2y$10$g25uonMUPRCFqFDrn0k/Gu7thZtaD1gqdmQS8uUVLI.OqY/rGzfBa', 'Robbin', 'Sturm', '1961/07/9 17:00:00', '60 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'lackadaisical956@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111174, 'divergent488', '$2y$10$C0vsjbL3fjohSqIARL9A9.cR0rqy6fkgYT7joIUQ.dBszZgNBRGuW', 'Clementina', 'Buffum', '1941/10/18 18:00:00', '61 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'divergent488@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111175, 'group245', '$2y$10$7sLI/uPFhhEVQT.qLggAZ.Rm5dIXNAiMhP5lmSSl3eGs3KlzzkDHG', 'Kamilah', 'Lembo', '1953/01/22 19:00:00', '62 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'group245@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111176, 'perpetual68', '$2y$10$UF2iDxJ2f5IYrz9L72Inh.Abib3..dqTTziUwlN2pQGKUrNAjSJe6', 'Donna', 'Almquist', '1988/02/13 21:00:00', '63 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'perpetual68@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111177, 'heady513', '$2y$10$8FmGzLCynX9h6u4z.2RageO.gjC55fT75yZPzdMzoOvZQVoGbEtWK', 'Alfredia', 'Guerrier', '1989/10/16 07:00:00', '64 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'heady513@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111178, 'reward690', '$2y$10$kOHjhnBlcUBbnBM5L2V2SeoPIE7GPuM0yJiF9BZUHgE20avVUcUBi', 'Keturah', 'Lashbrook', '1986/08/1 19:00:00', '65 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'reward690@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111179, 'dinosaurs422', '$2y$10$gqot6qepNCPXSlGrg/eEk.DZfnXXRBr034eY2iHN/H3i0A3ujVhy6', 'Shawanda', 'Dechant', '1942/04/9 16:00:00', '66 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'dinosaurs422@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111180, 'way89', '$2y$10$HwgDn81i/LuVtrDrxp0oiO7Pmdxe83iVJaI9jIKMPS3eyp/ydb1ZC', 'Katina', 'Tijerina', '1998/04/9 03:00:00', '67 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'way89@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111181, 'suffer946', '$2y$10$i3VLP6V/Kb3PGa8cGx3Pu.40Gk2cmYUM4LUwrRBaO2upWNxeh4gba', 'Linwood', 'Sanon', '1955/11/15 19:00:00', '68 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'suffer946@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111182, 'dirt602', '$2y$10$iO23ytOijTXgEA8KWTKvVukNcUxSjPn6RNG4EJvwGca0.Wsc1CbMW', 'Evita', 'Derry', '1947/04/2 11:00:00', '69 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'dirt602@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111183, 'sweater218', '$2y$10$74G92REBsw10uaEDbuqlE.NO4XeaI7Mzzoqgwuw5bCU4HJHmXKwca', 'Aida', 'Landon', '2001/01/11 18:00:00', '70 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'sweater218@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111184, 'lung526', '$2y$10$WvXdHUTGOlM7LrUHC68c6uAKw7NiOd98ZZ1WV4AdxHKzPHvZSrrna', 'Jamison', 'Lampe', '1950/05/11 16:00:00', '71 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'lung526@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111185, 'sleep463', '$2y$10$kUTJSzTS7vQtbOODRZ5p9uWu.UrS/Su3qR7LTomWiVc6g2yurynGW', 'Marry', 'Wroblewski', '1957/09/12 05:00:00', '72 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'sleep463@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111186, 'crow69', '$2y$10$0L9HkfraQK/YRRfg.qZee.hZx9YzRLzh00kO5icT.mKrowmQyfp8a', 'Jerrod', 'Parmer', '1986/02/4 06:00:00', '73 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'crow69@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111187, 'slow213', '$2y$10$/NcrRonH7NQsolCkwucDE.OYKEgTuYq.WE9UzTsXbGTwfaByhIoLq', 'Abe', 'Ellington', '1997/10/27 17:00:00', '74 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'slow213@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111188, 'wasteful769', '$2y$10$CyMLfwWKuUflvJijiTNnHeY6WNNZVyTGvka8RNdw9aP5qkTMAlPQm', 'Brandy', 'Wynter', '1958/11/9 07:00:00', '75 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'wasteful769@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111189, 'rainy511', '$2y$10$Lr2VEslVd44ZLO3ehotbCujZQ3s.Qnsj31KdHLVuZ1Uh97uXe0rRu', 'Lyn', 'Domingo', '1982/10/8 12:00:00', '76 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'rainy511@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111190, 'tough556', '$2y$10$Zm.S9AelSuniCbCwwtjdTOOidGvZ2gwc76KTmomyJHDIxcyihfSiW', 'Lilly', 'Grijalva', '1981/06/6 09:00:00', '77 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'tough556@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111191, 'stare138', '$2y$10$pZV8wdpPQ5CZ26lxPGATaeug7.JsXeoPGo46yOYws43fmNSP9KHcq', 'Eldon', 'Frias', '1989/08/21 15:00:00', '78 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'stare138@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111192, 'bury664', '$2y$10$q9sZ3rPBlz9dy.rJ5dz8Z.USaHBNEYQptc24Nxu1a49ZVs2wfc0Ie', 'Dolly', 'Finkle', '1985/06/13 14:00:00', '79 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'bury664@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111193, 'beautiful911', '$2y$10$j7p.oQuxJaSZu09PSnkow..V1qxP4rYTIj7uNtFwhF.NrW0yyPYOK', 'Foster', 'Dales', '1993/08/14 05:00:00', '80 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'beautiful911@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111194, 'jaded503', '$2y$10$HrxUn/0i7Xo4ONNs4/7Oeu3JY8pfoh6nkXUvrgUBB0FuBOAEdlhmq', 'Nam', 'Gascon', '1982/07/28 08:00:00', '81 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'jaded503@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111195, 'fixed855', '$2y$10$1wdEUecbbkmtowIbUYZDO.HNaZ1PIarl09EpP07EsgCGgxgU2ne.q', 'Arletta', 'Ficklin', '1980/06/19 01:00:00', '82 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'fixed855@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111196, 'person717', '$2y$10$1SRKLAHMAkmxQaUWjOxr/uyth13dUbL77DZxI142TWo7YQgPkaHfK', 'Beau', 'Wayt', '1988/12/18 05:00:00', '83 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'person717@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111197, 'pollution90', '$2y$10$yAqYATYKtN/0kkGv4DVLuuMrzCp.Jkw6MyEOgU6M/TJKH1l4.GANm', 'Versie', 'Maugeri', '1946/08/13 09:00:00', '84 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'pollution90@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111198, 'curly405', '$2y$10$SVl0dtY8Ef1J0qx0RT0vFO06DlACErXXiOQp32FY2WTodlqOV7SVe', 'Vannesa', 'Garnett', '1977/05/13 01:00:00', '85 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'curly405@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111199, 'raspy724', '$2y$10$JvNgAnMyrGjdRRo5ow55G.W/rq.0DcHBx84uMpwn7Ct0CToBy1uaq', 'Johnny', 'Ellefson', '1980/09/9 14:00:00', '86 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'raspy724@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111200, 'stormy126', '$2y$10$DCcBarwQyHk/r8I758SZfeYFm95TINjxKkShmY.hmtUoI9Jwb63/K', 'Kathie', 'Stines', '1948/12/21 19:00:00', '87 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'stormy126@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111201, 'birthday519', '$2y$10$BA4towzbd9DGZCEL5KbwdOJDAuuX.BcVahAfTRWzlyHWCuoGRa0Vi', 'Derek', 'Mardis', '1962/02/17 02:00:00', '88 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'birthday519@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111202, 'suggest423', '$2y$10$EufL6PkxxSvtl8LYN34tKebwoNywm3CEhfNyjJ2LVLzHU7Lfey4p6', 'Mistie', 'Dew', '1957/04/28 13:00:00', '89 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'suggest423@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111203, 'actually231', '$2y$10$HHF/nZwIMYTUpOC2K/ocpOd7DPyQu3oeK6J5xl3p7iArntL9Up656', 'Kaitlin', 'Fravel', '1959/03/16 20:00:00', '90 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'actually231@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111204, 'mix322', '$2y$10$XPzc3Mb0aD6Ozb5l6RPw6eEsIMMxuGJUxsx6U5fsZ3/97KEZL2h1y', 'Peggie', 'Heras', '1969/10/8 18:00:00', '91 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'mix322@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111205, 'bruise878', '$2y$10$nRzertrlkk72KLvayTsfFOduv1aA5pFtbKtn3hH3o0bXm0ekwHeLe', 'Maggie', 'Brownlow', '1946/06/23 05:00:00', '92 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'bruise878@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111206, 'launch543', '$2y$10$PBcV/ucNq4SHt4IVlYBFreukmJnAgmc8KKtMnBfOL9AuVFtqJUM/e', 'Dennis', 'Maier', '1956/07/23 16:00:00', '93 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'launch543@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111207, 'sick320', '$2y$10$pUr2RRXuqG4wBwfq0yGy9.y7cK10lukRhguY54m/UqS6aZQ7vqghu', 'Lenard', 'Janicki', '1972/10/25 07:00:00', '94 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'sick320@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111208, 'needy537', '$2y$10$DUVOGolw6DQqzHH/3scRnucS/puE2uzXTzRxX9q8aT3tJ5yMDqxGC', 'Alana', 'Nealy', '1950/06/1 23:00:00', '95 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'needy537@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111209, 'volatile491', '$2y$10$ouCYiAH3T.Fq204VKfk/3.cIaKYYIGdPxk8lcU38OhUrt9yph0pY6', 'Bernice', 'Yarborough', '1954/02/21 04:00:00', '96 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'volatile491@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111210, 'calculator522', '$2y$10$WhwMlv42z18Og5loPADVAe8.n.9u3XHX59JVYxyuMjydbFYFvLxWq', 'Margert', 'Schlottmann', '1942/06/12 07:00:00', '97 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'calculator522@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111211, 'beds420', '$2y$10$D9IbccRpkPAbsHv4rpYYXutxpfJ4RHrZZ.cc.XQf0wzPFSSfd1ste', 'Joyce', 'Vivanco', '1952/07/6 18:00:00', '98 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'beds420@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111212, 'maddening519', '$2y$10$9TGUt3MGZJ6R7TlcGlrYWOu6ZLRZ990.y2KL14vUpRioXOJYR5iKO', 'Colette', 'Brueggeman', '1943/01/21 09:00:00', '99 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'maddening519@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111213, 'tendency859', '$2y$10$zZ.rvZ4bqzpRd5etMzarZO44A/CDxPrltSMPf0WZSOXJDZJroTFVK', 'Kami', 'Jim', '1984/10/26 09:00:00', '100 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'tendency859@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111214, 'snake78', '$2y$10$uT94t.iBA055./I0q8Fz4eaZ5YQSvp7LF.QEkBMp0OofJlUWmgWWm', 'Jeremiah', 'Baynes', '1964/05/18 18:00:00', '101 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'snake78@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111215, 'brave30', '$2y$10$Abt4iqTs8U9Cuk6gknf6f.mZEr8eJsspZ4PvoTyyFmNnDFUCYkHy2', 'Magali', 'Scranton', '1951/01/11 09:00:00', '102 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'brave30@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111216, 'remind282', '$2y$10$./2RKGt0xfXEFrKJVmKBDuCOrwPPJimzg27hqOFz3kzZgOuhS5wlC', 'Sparkle', 'Bernat', '1979/11/27 02:00:00', '103 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'remind282@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111217, 'powder104', '$2y$10$uT79M0fC7AkGpdDFD3QAguYEodMHh87nBMFxK6IChLrwbGbVtGiDe', 'Romana', 'Gallien', '1991/09/1 22:00:00', '104 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'powder104@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111218, 'annoying973', '$2y$10$SrKXKs.Z/mOd5fiTP4wCTu/uZtDMdS1bVs.cZWoLqDp0YeTcuvmaO', 'Maya', 'Keesler', '1977/09/20 05:00:00', '105 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'annoying973@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111219, 'lazy175', '$2y$10$JUpCsnNtISQ9woKICOY2NeCjGZPrwiONqY9gxUDBNSKUTmW5WBoEm', 'Carli', 'Mchale', '1997/04/28 03:00:00', '106 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'lazy175@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111220, 'vein559', '$2y$10$yp.xYtX3MFbmmf6k/6RSXemT6js.e0bsQRgywdTAZstdQk3yCdjqS', 'Kia', 'Douglas', '1946/04/27 20:00:00', '107 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'vein559@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111221, 'existence440', '$2y$10$d3jEpNcUxIuT0/ApMQpNDuVIOC9/OSP7zTwAZQiSpHoGnjc9CHlEW', 'Alene', 'Mclamb', '1971/06/18 08:00:00', '108 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'existence440@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111222, 'glow500', '$2y$10$zS0JDwWUKrJkifkss.M6eurTBLX8K/QtCVHMEPExybv/KNEw1f8ha', 'Barney', 'Aiken', '1966/05/9 06:00:00', '109 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'glow500@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111223, 'political994', '$2y$10$meTqQZ1ze4307cvUIMeFfOvj7lG9HiBeDtkTFqNrT6TtD5L1glxF6', 'Octavio', 'Greenough', '1951/04/27 16:00:00', '110 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'political994@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111224, 'hilarious466', '$2y$10$uxM.fIJBb5OyI5h/KjS7futjbTRjLVrzIe.AQoQOXsgtxtJAmCIny', 'Quinton', 'Favero', '1977/01/28 16:00:00', '111 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'hilarious466@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111225, 'poke388', '$2y$10$WDjvx.6Ljz7mebFwGYlwkuSiFmIUwBwKx3oS0WstF1n9MCHlwK1B.', 'Fay', 'Tackitt', '1977/03/10 14:00:00', '112 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'poke388@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111226, 'fluttering647', '$2y$10$r3z5TjHlPta.u8cbpeNjL.r/wjVw2RMi./0dYOEx9B.DGw7s2UtNm', 'Evie', 'Blocker', '1968/05/9 00:00:00', '113 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'fluttering647@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111227, 'paddle122', '$2y$10$tWag6V0O3pqa7GbXOl4jCu/sAA20OOEeWcKu8hu0IIM.UP44gyDb.', 'Casey', 'Hammersley', '1941/03/12 00:00:00', '114 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'paddle122@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111228, 'uppity660', '$2y$10$hpLi77oj.xtJzlJNE/g2ueecdxV6/IVSOxMLZE67rm9xXaDi9JbUO', 'Elnora', 'Ottesen', '1942/09/19 15:00:00', '115 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'uppity660@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111229, 'hand523', '$2y$10$iUF8zqprP.HhpWeHDBdSW.ejaeWHIKCsLZn7ZsZnu6TUa35r93/KG', 'Lynsey', 'Strub', '1989/07/11 01:00:00', '116 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'hand523@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111230, 'long-term296', '$2y$10$cwgY0nwyijoNp9a9oRJh9uVRPBwSeVYiyzCgLssCFqESyUbA/hm3q', 'Ghislaine', 'Stauffer', '1982/01/19 16:00:00', '117 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'long-term296@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111231, 'stem530', '$2y$10$Q7ASF2lsO02sOPRYXt006.IJBFWGneIDdlAq2VovSDW0Zuw5P2s1q', 'Abel', 'Sterba', '1960/04/5 18:00:00', '118 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'stem530@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111232, 'room4', '$2y$10$aVYB/qnEgop2xBYD8RFs1OkOAsIAXz/dIwr3yFe3bzZ2E932jtbFW', 'Niesha', 'Marrufo', '1958/03/6 17:00:00', '119 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'room4@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111233, 'material579', '$2y$10$Uh7iR1feoEZg3k6eECtzTeTyzAPolLZ3zktwaQCUNk8oPJt9VeJ3K', 'Elane', 'Hopp', '1967/04/8 00:00:00', '120 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'material579@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111234, 'ordinary438', '$2y$10$M7Ls8gvxdXiHjW9r9jRXAuQWrc7.xV5G/.oG9gfYw4RWAyK0j9Imm', 'Noella', 'Santo', '1949/03/24 08:00:00', '121 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'ordinary438@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111235, 'robust794', '$2y$10$qxBCcRMnZicLHhUMpYihaeAN.qZ.9L21pSKrOo5s.loOxtPWDhkRm', 'Corrinne', 'Jordahl', '1974/07/22 20:00:00', '122 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'robust794@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111236, 'mom772', '$2y$10$rb1zQm/Bn2JMytwHQCYV8uAnVQWbkORoLe3XFEL1YjM4RUkjxw6NW', 'Noreen', 'Loken', '1958/07/15 16:00:00', '123 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'mom772@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111237, 'kick701', '$2y$10$TltJUwt7SJxBpO5/qUbg9OzGm1bLJlxYIEHIX9AslKRD3iXsCOSMW', 'Georgiana', 'Hoerr', '1996/06/24 21:00:00', '124 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'kick701@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111238, 'current346', '$2y$10$mYPGIBDq6pOws0HVic6SDepaSQSHKeAJiRMO.mvcbWWQNs.1eq2Du', 'Maryland', 'Rieger', '1953/08/8 04:00:00', '125 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'current346@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111239, 'kind43', '$2y$10$uVSBADkp0SlXlBs7ugLpyuN6mREmEviOMAame7cMNsKox.GnYbuZa', 'Earnestine', 'Ruck', '1955/06/11 12:00:00', '126 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'kind43@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111240, 'obtain965', '$2y$10$DoAuqEzd05kjEvSb.bxLoeH3RxIISacZ7WjVLkZQNxWwbKMmW3ogy', 'Josephina', 'Wetzler', '1956/02/27 09:00:00', '127 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'obtain965@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111241, 'sponge248', '$2y$10$1eiK82/mVURT2hbaVTjVZuVaGgRtozLrQWNUvqTOwtNUfBRtVgBW6', 'Joann', 'Bragdon', '1947/08/25 04:00:00', '128 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'sponge248@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111242, 'scribble823', '$2y$10$4nyZ6S25dBN338qYzEzbX.3zXe2lTEcWD5Uz6lE/U28Inn2k/GF4e', 'Shemeka', 'Renzi', '1946/01/24 16:00:00', '129 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'scribble823@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111243, 'solid347', '$2y$10$Gft8wlL/Ds0pkM0arBa70O8hOus0uusT.yizXACLzyAAwivMRvbQe', 'Dolly', 'Tousignant', '1995/10/23 14:00:00', '130 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'solid347@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111244, 'coordinated792', '$2y$10$blLp0p9lDxo9pl2pKSxnoONSjtkv/kR3IJr4UNRGWXqYSCMyQQ.UG', 'Lorena', 'Corwin', '1963/02/22 16:00:00', '131 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'coordinated792@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111245, 'sparkle58', '$2y$10$Wz9aQETLPOP8h1K2YRHhV.HtO5nby/08SsiTZKyxtNwje24XldQGK', 'Kourtney', 'Claflin', '1979/05/16 20:00:00', '132 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'sparkle58@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111246, 'murder242', '$2y$10$RRarAW5WWlHfF8c55/K2cu4HzxxX3az3rPjA/Si8ZQI7TUF/Ac3ea', 'Andy', 'Canterbury', '1956/04/20 19:00:00', '133 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'murder242@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111247, 'fade108', '$2y$10$//wUHh767O74s3pptBy4autWf9hnwIuzAHaQ66uvNqDl0ukPcWw0K', 'Collette', 'Sancho', '1979/06/17 22:00:00', '134 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'fade108@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111248, 'married694', '$2y$10$LAf4Yadq3JrOJrWsQFrRm.3b77GsykynhNFg5eeljOZ55iHRxCI4q', 'Polly', 'Watts', '1970/10/12 04:00:00', '135 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'married694@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111249, 'chin32', '$2y$10$Cfo61ROl/95tc6iqiuKYweGpjK474oI8gjM4/b4ro4JFamy1SrKty', 'Stanton', 'Stjean', '1977/02/18 05:00:00', '136 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'chin32@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111250, 'behavior843', '$2y$10$69tRdLJ4K.L3EpOI3sIQvu7yKq6KNm23jAD2ztVoujAVOioIX5Km2', 'Jerald', 'Sund', '1960/10/20 10:00:00', '137 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'behavior843@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111251, 'discover592', '$2y$10$1b8kd4P4NKtMIHQ1gxV5y.4kyyYq3XxprGazy5vO4D24lWBtheArq', 'Robert', 'Mescher', '1966/08/2 20:00:00', '138 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'discover592@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111252, 'cart343', '$2y$10$muoDZV1SDIqm0w8PS83vQeHD7q4e418l8MTmy7.vfL1HCoODqHwky', 'Ewa', 'Ison', '1979/08/12 12:00:00', '139 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'cart343@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111253, 'notebook478', '$2y$10$x0Nz0DIpxjCp3XsLngwggu8toSo9DLrLfz0pFHouZUEN9T45NUlXi', 'Carlie', 'Crumb', '1993/04/12 00:00:00', '140 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'notebook478@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111254, 'addition227', '$2y$10$7230CEobsmtghn7p1EeonODFP5B7OwrS9Yz6jfjVWOtrClgFVIFDy', 'Nilda', 'Mahood', '1947/08/19 04:00:00', '141 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'addition227@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111255, 'verdant510', '$2y$10$B43fHiLWN8AqLG8DozYdNudUWIt7jI8bEleMf5SfJy02Ess3KjSju', 'Brande', 'Thrall', '1952/10/5 08:00:00', '142 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'verdant510@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111256, 'woman817', '$2y$10$2LBqCx55/PPM6VA272bBjuLNIOHI/vziiqXfbDwbAA7lprLfHbOfW', 'Lauran', 'Edinger', '1990/04/7 16:00:00', '143 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'woman817@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111257, 'vivacious413', '$2y$10$mvfF2pfMjG6ExVQPJJLeJ.RVm5MHnllYrwa2Qu.uPvsebwqffpE0K', 'Annetta', 'Crase', '1966/07/28 01:00:00', '144 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'vivacious413@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111258, 'strap214', '$2y$10$bc9SH29s3vumsTBzYl8DIOhgtr6VWkI86iHB3H.nNIX.UqBCYB3X.', 'Leatha', 'Yerger', '1999/11/15 15:00:00', '145 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'strap214@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111259, 'squash727', '$2y$10$qUNv7tRENRed83pd.zRI4uplEU8wtzaG/lZHvwe1YoMF.bFP/t386', 'Phylicia', 'Ivester', '1973/03/25 12:00:00', '146 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'squash727@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111260, 'muddle387', '$2y$10$QIpuRSwXMzUuKxGLQR.A5O/tGu2u2Ls5zFp8exDyu4.TWLdDnfAKe', 'Guy', 'Serafino', '1961/02/11 17:00:00', '147 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'muddle387@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111261, 'tree827', '$2y$10$yIqsIKMpeao5GPfLktENBO/CUnuVnaMZEs1p/Ppdw4syyQezMsvxS', 'Rosann', 'Lieser', '1991/09/8 16:00:00', '148 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'tree827@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111262, 'flesh475', '$2y$10$Td9V.PL3e15X63n25urEyOIlgCY35VA2Fy6zegUrhGHP/OzGBdaDe', 'Ethel', 'Rizo', '1954/11/22 15:00:00', '149 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'flesh475@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111263, 'credit88', '$2y$10$AUzABj9oqz2EWD.pfVDLDOnESyfmN98BbLWBrS4FXFU01hvCnMaQ6', 'Tamala', 'Jacko', '1995/10/12 21:00:00', '150 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'credit88@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111264, 'juvenile264', '$2y$10$q0R/QHijgIV9bQVNVHD/9.Jz73BhwAYIRqnmeYvkHjcYUSLT/fS.2', 'Magda', 'Dang', '1961/05/28 02:00:00', '151 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'juvenile264@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111265, 'explain867', '$2y$10$knHbZx9N5/qxul/xSLReZe1dMTFloKTHcqm2Af6P9lwDSVVmyhubS', 'Fermina', 'Fremont', '1951/07/18 19:00:00', '152 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'explain867@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111266, 'rustic899', '$2y$10$aGBnMIgQ7bRRRUVT1BSS8eHScqtgor.jRVckmaB8M3s79./52pR.u', 'Anabel', 'Mean', '1966/11/26 03:00:00', '153 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'rustic899@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111267, 'desert448', '$2y$10$C1XzHdAnGemUEizwmVdLYOyHsnOgFGQ2NoqHdFxIFlmir/n55d/jG', 'Isabella', 'Carpenter', '2000/07/19 23:00:00', '154 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'desert448@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111268, 'handsomely615', '$2y$10$FKw11Bfh8mxqJ7WvVZ/MmOpovJEFwdv09s88R.pHRTfrGU9if/1j6', 'Shu', 'Grieves', '1958/01/12 01:00:00', '155 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'handsomely615@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111269, 'water805', '$2y$10$mGaRTvPboidYO8jJyOnLneuCe1BB5VwCFrSc2Lwc9xVUomB3i7TlG', 'Desmond', 'Westmoreland', '1980/06/21 12:00:00', '156 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'water805@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111270, 'buzz818', '$2y$10$qeX4BXTZTHFLKzRPFN970OKUB35Ytce7.FnvUmrOVj6s/fUqqiEwy', 'Victorina', 'Dodson', '1991/10/24 05:00:00', '157 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'buzz818@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111271, 'momentous100', '$2y$10$U8Y8jyj9kFtV3za6HpZ7b.54ku7.Lu7FWLeM1MpK/SXyyPOfn7KPS', 'Sage', 'Arbeiter', '1983/05/13 17:00:00', '158 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'momentous100@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111272, 'overt365', '$2y$10$6ZfSUkghxu85gxWKcOYVMOcNs9WxZtBani0CLZDJyS/snN.F2yI06', 'Lynette', 'Pepper', '1992/11/25 17:00:00', '159 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'overt365@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111273, 'ball870', '$2y$10$uZ6wuV16zQEghs.w5Md.uu00shCHZfvxLecLeEzYyvUy5PQpwIfka', 'Darryl', 'Moats', '1977/06/26 11:00:00', '160 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'ball870@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111274, 'miscreant279', '$2y$10$Hy0x60t7R0C.E2zkl2SgROU.ALyrtjzvUZoFjhSF5R5IkqNKbhOUm', 'Hildegard', 'Luedke', '1963/08/16 01:00:00', '161 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'miscreant279@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111275, 'son909', '$2y$10$WFbt7Bgc8hl7hAAIczOcSOL1PQgAjoMCwjUX4fVFrVGBc9C0Y8Y.2', 'Ariana', 'Claborn', '1955/04/10 17:00:00', '162 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'son909@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111276, 'own930', '$2y$10$D34RkGeMnfvM.Gv.vSxwBegSD9abwO88C68OTq3pOloaQHY61G7mS', 'Margorie', 'Ebersole', '1951/02/20 04:00:00', '163 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'own930@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111277, 'trees168', '$2y$10$RlnscIsJ/xdYF2AhVjsyT./Sr.ALSIB0m5dJs5Bp1yKDmHsMyK.B6', 'Maye', 'Wakeman', '1960/07/11 22:00:00', '164 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'trees168@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111278, 'promise24', '$2y$10$itHSdDVH.HJQ9TpK.WXYceLYD9oP73v4yKobfruh41Uz8uiBHRime', 'Monroe', 'Soliday', '1941/06/4 09:00:00', '165 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'promise24@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111279, 'defiant145', '$2y$10$HQXn2VFjhVUUcn8WoZ0r8OoIdu0Ro.4MtpFWW8AwqmPF26dmINUgm', 'Reena', 'Braz', '1988/12/15 03:00:00', '166 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'defiant145@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111280, 'creator952', '$2y$10$Nmlbg/YBUdHPNrQ2giaEsehi7Q5rIsKNfCYW6Qx8ozmUUDa3lNfSq', 'Jeremy', 'Rayborn', '1979/11/21 16:00:00', '167 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'creator952@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111281, 'develop176', '$2y$10$CvanS3.tYAPnrPORzmcRLuM/JpRil6bKgqjDsYeTzcC9F.VL4gnEC', 'Tamiko', 'Blanc', '1951/06/27 13:00:00', '168 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'develop176@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111282, 'include629', '$2y$10$5DZZbmM8FEDBddg3yR6D6uulc86Db0D21dFra8hGd1JbL0aglNzNC', 'Dorsey', 'Huling', '1989/03/7 07:00:00', '169 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'include629@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111283, 'sack910', '$2y$10$nZM7JOWETrH3EGGyF9/Zo.EPMWpnvnMtuTEwbyo.aMdhZOHCzQufi', 'Cori', 'Seekins', '1984/09/25 00:00:00', '170 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'sack910@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111284, 'wacky583', '$2y$10$aemd/Kz/P8PDDLasQYfLreIQRD5xbK8t8hohhtIV28V4fmWxe57U2', 'Rosette', 'Schill', '1987/12/15 13:00:00', '171 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'wacky583@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111285, 'choke792', '$2y$10$KjWKZmJctThX67PRewmyTOw8XRhmB72tt.cq7UfxaoVEjNTXJRrDG', 'Tyler', 'Kilbourne', '1977/12/16 07:00:00', '172 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'choke792@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111286, 'overwrought463', '$2y$10$20egJ.B1O8jU5iYDA9jj4uuDrtMcLjGaedmg2FW6NHuKsr/cInUTK', 'Lora', 'Resendez', '1999/02/8 16:00:00', '173 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'overwrought463@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111287, 'copper840', '$2y$10$sc0ml27MijMdlpzbWzEPNukY8tRC5j2HLk7biyfYLa.xW8km3rERO', 'Tyron', 'Moscoso', '1954/11/23 02:00:00', '174 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'copper840@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111288, 'measly820', '$2y$10$FyV90VBLsGBXEdBLGjDFPet3zo/iJQZJs.LORffgprc9TmFFK8OCi', 'Queen', 'Stroupe', '1953/06/1 19:00:00', '175 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'measly820@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111289, 'obedient342', '$2y$10$tYW5QgxXAPkp7yHSVl4KH.JdGqalfmCLVtRHXdz./MH6k3KDJBIXq', 'Leland', 'Pitt', '1989/07/6 11:00:00', '176 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'obedient342@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111290, 'transport254', '$2y$10$vU6vgW7aqxYqjsYAVge5P.9JspKgk.ktZh6sYzBjFV83hWvoXVbvO', 'Rozella', 'Mcglamery', '1954/08/18 04:00:00', '177 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'transport254@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111291, 'obsolete355', '$2y$10$OFUAKGC5HcvaAIOkllxU4uPq4bXv.R/aJH1KnYs/I6T0kIfhJ.uLq', 'Sharron', 'Bran', '1989/02/24 15:00:00', '178 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'obsolete355@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111292, 'pack996', '$2y$10$cj2RYNk6VC0PqJzg9pAXA.QRjdo4Is/yR/RgY4FwlGkAd656ZS5Me', 'Delores', 'Ferrill', '1941/07/11 02:00:00', '179 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'pack996@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111293, 'complete810', '$2y$10$81A9g7o3kxPhPyR29V4fkuzaIybs2c1Cl3gOstf9j3TvOoxFE5LsO', 'Lucinda', 'Shutts', '1949/10/10 23:00:00', '180 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'complete810@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111294, 'memorize64', '$2y$10$FFSwa7CdkeZ4sIrwxKPBKO2CRRFqfrqxzKtwFGlq5Qgfw3vCE85S2', 'Willy', 'Melanson', '1945/08/17 22:00:00', '181 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'memorize64@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111295, 'damage590', '$2y$10$cT6uK6E57ShnqcVCmWPXlehKafagXJypEl5w67p2y57DpsPEs8xf.', 'Erik', 'Stanback', '1966/11/4 21:00:00', '182 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'damage590@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111296, 'pail904', '$2y$10$HATVXglQffwj7PkWdWxUwuiWA/lxxjDMutgNFjMA.kR..6DpBN0I2', 'Jarod', 'Roebuck', '1981/01/24 16:00:00', '183 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'pail904@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111297, 'sticks385', '$2y$10$G4C3ffN.SQB1WcuMVBbplu2SdNMUh/w9y6VcjD2XGp0wRAAUw0Ocy', 'Hanna', 'Shontz', '1987/10/18 00:00:00', '184 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'sticks385@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111298, 'boorish660', '$2y$10$cJho7qKc9l.Hfqh74uL3/e2gJ9eeLwPGG7hBhGavA.eKnRqBh8.f.', 'Romona', 'Barrie', '1943/10/12 15:00:00', '185 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'boorish660@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111299, 'passenger322', '$2y$10$CB7x/JgksjtKbXvny/1m..tl/JKLmCvcD3OEYbASMbQbUSiDl.wge', 'Lazaro', 'Silverio', '2002/10/15 21:00:00', '186 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'passenger322@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111300, 'tug914', '$2y$10$zvNZ87IO.wsPkidPRgJXte3MRoJMI4X1OU2lriU7zTP7gmYtzV/gO', 'Donna', 'Neagle', '1958/10/10 03:00:00', '187 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'tug914@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111301, 'shivering553', '$2y$10$pyGrNvy7svP4CY80zQxugOfFzbPGiN5UfkVqrnW7Fs9YEKQtt3Tt.', 'Marylynn', 'Capuano', '1943/02/18 22:00:00', '188 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'shivering553@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111302, 'society573', '$2y$10$ZzyPQn7aJB1Y/uh9BJM5.O/3qPwNntG4fWEX8kd8YWSaRv08USW5a', 'Elise', 'Leyva', '1975/11/1 15:00:00', '189 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'society573@gmail.com', 'No comment.', '-', NOW());

CALL createPatient(1, 1111111303, 'back633', '$2y$10$ogU1Z2cuh2w.anxuwQHI6.fpQlPFl5CMdBnk9ztuKJzy2iznfI0pO', 'Marcie', 'Brafford', '1980/04/25 04:00:00', '190 Some Road', 'Some Flat', 'PL3XQC', '01752123999', '+447849198656', 'back633@gmail.com', 'No comment.', '-', NOW());

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (1, '2021/01/5 06:00:00', 'I hung out with my friend Maureen');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (1, '2021/03/5 00:00:00', 'I hung out with my friend Mckenzie');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (1, '2021/03/7 03:00:00', 'I hung out with my friend Larue');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (1, '2021/02/26 05:00:00', 'I hung out with my friend Nicholle');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (1, '2021/02/14 03:00:00', 'I hung out with my friend Jeannie');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (1, '2021/02/18 02:00:00', 'I hung out with my friend Christinia');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (1, '2021/02/5 04:00:00', 'I hung out with my friend Odelia');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (1, '2021/02/10 15:00:00', 'I hung out with my friend Suellen');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (1, '2021/03/3 06:00:00', 'I hung out with my friend Maris');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (1, '2021/01/3 11:00:00', 'I hung out with my friend Wyatt');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (1, '2021/01/17 04:00:00', 'I hung out with my friend Terese');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (1, '2021/02/26 13:00:00', 'I hung out with my friend Andrea');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (1, '2021/03/8 11:00:00', 'I hung out with my friend Armanda');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (1, '2021/02/20 10:00:00', 'I hung out with my friend Hilton');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (1, '2021/02/10 11:00:00', 'I hung out with my friend Tyesha');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (1, '2021/02/21 03:00:00', 'I hung out with my friend Tuyet');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (1, '2021/02/14 20:00:00', 'I hung out with my friend Nikki');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (1, '2021/01/10 09:00:00', 'I hung out with my friend Magen');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (1, '2021/03/13 09:00:00', 'I hung out with my friend Ayana');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (1, '2021/02/5 20:00:00', 'I hung out with my friend Marhta');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (1, '2021/02/24 00:00:00', 'I hung out with my friend Luanne');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (1, '2021/01/5 08:00:00', 'I hung out with my friend Amal');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (1, '2021/01/18 23:00:00', 'I hung out with my friend Jacques');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (1, '2021/03/9 00:00:00', 'I hung out with my friend Lorinda');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (1, '2021/03/12 19:00:00', 'I hung out with my friend Alexandra');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (1, '2021/03/12 20:00:00', 'I hung out with my friend Lashaun');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (1, '2021/02/11 18:00:00', 'I hung out with my friend Shondra');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (1, '2021/02/26 17:00:00', 'I hung out with my friend Russell');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (1, '2021/01/26 16:00:00', 'I hung out with my friend Merry');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (1, '2021/02/2 01:00:00', 'I hung out with my friend Anastasia');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (1, '2021/03/4 21:00:00', 'I hung out with my friend Shirlee');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (1, '2021/01/25 00:00:00', 'I hung out with my friend Sunny');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (1, '2021/02/1 19:00:00', 'I hung out with my friend Natisha');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (1, '2021/01/26 01:00:00', 'I hung out with my friend Juliana');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (1, '2021/01/6 20:00:00', 'I hung out with my friend Alissa');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (1, '2021/01/12 10:00:00', 'I hung out with my friend Amina');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (1, '2021/02/28 22:00:00', 'I hung out with my friend Leonila');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (1, '2021/01/11 04:00:00', 'I hung out with my friend Bernarda');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (1, '2021/01/9 06:00:00', 'I hung out with my friend Gretchen');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (1, '2021/03/17 07:00:00', 'I hung out with my friend Dudley');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (1, '2021/01/20 13:00:00', 'I hung out with my friend Caleb');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (1, '2021/03/16 03:00:00', 'I hung out with my friend Mia');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (1, '2021/02/21 14:00:00', 'I hung out with my friend Sheron');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (1, '2021/03/16 07:00:00', 'I hung out with my friend Pauletta');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (1, '2021/03/2 02:00:00', 'I hung out with my friend Alfreda');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (1, '2021/01/25 23:00:00', 'I hung out with my friend Lexie');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (1, '2021/03/4 07:00:00', 'I hung out with my friend Ferne');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (1, '2021/03/16 16:00:00', 'I hung out with my friend Grisel');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (1, '2021/01/21 08:00:00', 'I hung out with my friend Tonie');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (1, '2021/02/22 01:00:00', 'I hung out with my friend Gordon');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (1, '2021/01/3 07:00:00', 'I hung out with my friend Cira');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (1, '2021/02/9 11:00:00', 'I hung out with my friend Terrilyn');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (1, '2021/03/16 19:00:00', 'I hung out with my friend Livia');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (1, '2021/01/5 14:00:00', 'I hung out with my friend Chana');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (1, '2021/01/11 10:00:00', 'I hung out with my friend Shyla');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (1, '2021/02/25 08:00:00', 'I hung out with my friend Branden');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (1, '2021/02/21 11:00:00', 'I hung out with my friend Warren');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (1, '2021/02/13 05:00:00', 'I hung out with my friend Octavio');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (1, '2021/03/13 00:00:00', 'I hung out with my friend Nancee');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (1, '2021/02/22 19:00:00', 'I hung out with my friend Clarinda');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (1, '2021/02/13 05:00:00', 'I hung out with my friend Robbin');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (1, '2021/02/6 01:00:00', 'I hung out with my friend Clementina');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (1, '2021/02/9 14:00:00', 'I hung out with my friend Kamilah');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (1, '2021/01/14 15:00:00', 'I hung out with my friend Donna');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (1, '2021/02/20 07:00:00', 'I hung out with my friend Alfredia');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (1, '2021/03/10 08:00:00', 'I hung out with my friend Keturah');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (1, '2021/01/13 01:00:00', 'I hung out with my friend Shawanda');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (1, '2021/03/10 17:00:00', 'I hung out with my friend Katina');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (1, '2021/03/8 20:00:00', 'I hung out with my friend Linwood');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (1, '2021/01/11 04:00:00', 'I hung out with my friend Evita');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (1, '2021/03/14 03:00:00', 'I hung out with my friend Aida');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (1, '2021/02/21 07:00:00', 'I hung out with my friend Jamison');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (1, '2021/02/28 03:00:00', 'I hung out with my friend Marry');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (1, '2021/01/27 16:00:00', 'I hung out with my friend Jerrod');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (1, '2021/02/18 18:00:00', 'I hung out with my friend Abe');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (1, '2021/01/28 10:00:00', 'I hung out with my friend Brandy');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (1, '2021/03/12 05:00:00', 'I hung out with my friend Lyn');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (1, '2021/03/6 13:00:00', 'I hung out with my friend Lilly');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (1, '2021/02/26 02:00:00', 'I hung out with my friend Eldon');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (1, '2021/03/16 19:00:00', 'I hung out with my friend Dolly');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (1, '2021/02/6 03:00:00', 'I hung out with my friend Foster');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (1, '2021/01/20 11:00:00', 'I hung out with my friend Nam');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (1, '2021/02/11 21:00:00', 'I hung out with my friend Arletta');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (1, '2021/02/23 20:00:00', 'I hung out with my friend Beau');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (1, '2021/02/26 12:00:00', 'I hung out with my friend Versie');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (1, '2021/02/11 22:00:00', 'I hung out with my friend Vannesa');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (1, '2021/02/23 08:00:00', 'I hung out with my friend Johnny');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (1, '2021/01/16 01:00:00', 'I hung out with my friend Kathie');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (1, '2021/03/11 02:00:00', 'I hung out with my friend Derek');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (1, '2021/02/1 10:00:00', 'I hung out with my friend Mistie');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (2, '2021/03/6 19:00:00', 'I hung out with my friend Kaitlin');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (2, '2021/01/14 02:00:00', 'I hung out with my friend Peggie');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (2, '2021/02/15 00:00:00', 'I hung out with my friend Maggie');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (2, '2021/02/24 16:00:00', 'I hung out with my friend Dennis');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (2, '2021/01/22 17:00:00', 'I hung out with my friend Lenard');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (2, '2021/03/11 11:00:00', 'I hung out with my friend Alana');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (2, '2021/01/2 13:00:00', 'I hung out with my friend Bernice');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (2, '2021/03/17 14:00:00', 'I hung out with my friend Margert');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (2, '2021/02/22 09:00:00', 'I hung out with my friend Joyce');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (2, '2021/02/18 01:00:00', 'I hung out with my friend Colette');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (2, '2021/01/1 23:00:00', 'I hung out with my friend Kami');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (2, '2021/02/16 22:00:00', 'I hung out with my friend Jeremiah');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (2, '2021/01/22 11:00:00', 'I hung out with my friend Magali');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (2, '2021/03/4 13:00:00', 'I hung out with my friend Sparkle');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (2, '2021/03/10 03:00:00', 'I hung out with my friend Romana');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (2, '2021/01/9 00:00:00', 'I hung out with my friend Maya');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (2, '2021/02/12 08:00:00', 'I hung out with my friend Carli');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (2, '2021/03/13 08:00:00', 'I hung out with my friend Kia');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (2, '2021/02/21 05:00:00', 'I hung out with my friend Alene');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (2, '2021/03/14 19:00:00', 'I hung out with my friend Barney');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (2, '2021/03/2 11:00:00', 'I hung out with my friend Octavio');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (2, '2021/03/7 03:00:00', 'I hung out with my friend Quinton');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (2, '2021/02/17 21:00:00', 'I hung out with my friend Fay');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (2, '2021/03/17 23:00:00', 'I hung out with my friend Evie');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (2, '2021/03/11 08:00:00', 'I hung out with my friend Casey');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (2, '2021/02/12 15:00:00', 'I hung out with my friend Elnora');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (2, '2021/01/11 13:00:00', 'I hung out with my friend Lynsey');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (2, '2021/01/10 16:00:00', 'I hung out with my friend Ghislaine');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (2, '2021/01/22 01:00:00', 'I hung out with my friend Abel');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (2, '2021/03/16 03:00:00', 'I hung out with my friend Niesha');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (2, '2021/02/10 19:00:00', 'I hung out with my friend Elane');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (2, '2021/02/18 19:00:00', 'I hung out with my friend Noella');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (2, '2021/02/16 03:00:00', 'I hung out with my friend Corrinne');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (2, '2021/03/13 01:00:00', 'I hung out with my friend Noreen');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (2, '2021/02/15 13:00:00', 'I hung out with my friend Georgiana');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (2, '2021/01/20 08:00:00', 'I hung out with my friend Maryland');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (2, '2021/02/5 15:00:00', 'I hung out with my friend Earnestine');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (2, '2021/02/7 15:00:00', 'I hung out with my friend Josephina');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (2, '2021/03/5 00:00:00', 'I hung out with my friend Joann');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (2, '2021/03/7 03:00:00', 'I hung out with my friend Shemeka');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (2, '2021/03/2 20:00:00', 'I hung out with my friend Dolly');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (2, '2021/01/5 15:00:00', 'I hung out with my friend Lorena');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (2, '2021/01/25 16:00:00', 'I hung out with my friend Kourtney');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (2, '2021/01/11 10:00:00', 'I hung out with my friend Andy');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (2, '2021/03/7 07:00:00', 'I hung out with my friend Collette');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (2, '2021/03/1 01:00:00', 'I hung out with my friend Polly');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (2, '2021/03/12 09:00:00', 'I hung out with my friend Stanton');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (2, '2021/03/5 09:00:00', 'I hung out with my friend Jerald');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (2, '2021/03/4 10:00:00', 'I hung out with my friend Robert');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (2, '2021/03/15 09:00:00', 'I hung out with my friend Ewa');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (3, '2021/01/22 03:00:00', 'I hung out with my friend Carlie');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (3, '2021/01/7 17:00:00', 'I hung out with my friend Nilda');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (3, '2021/02/24 12:00:00', 'I hung out with my friend Brande');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (3, '2021/01/1 06:00:00', 'I hung out with my friend Lauran');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (3, '2021/02/16 13:00:00', 'I hung out with my friend Annetta');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (3, '2021/02/19 07:00:00', 'I hung out with my friend Leatha');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (3, '2021/02/20 13:00:00', 'I hung out with my friend Phylicia');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (3, '2021/01/27 00:00:00', 'I hung out with my friend Guy');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (3, '2021/01/28 11:00:00', 'I hung out with my friend Rosann');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (3, '2021/01/19 05:00:00', 'I hung out with my friend Ethel');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (3, '2021/01/20 06:00:00', 'I hung out with my friend Tamala');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (3, '2021/02/21 13:00:00', 'I hung out with my friend Magda');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (3, '2021/02/5 11:00:00', 'I hung out with my friend Fermina');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (3, '2021/01/20 00:00:00', 'I hung out with my friend Anabel');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (3, '2021/03/15 01:00:00', 'I hung out with my friend Isabella');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (3, '2021/02/1 16:00:00', 'I hung out with my friend Shu');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (3, '2021/01/16 10:00:00', 'I hung out with my friend Desmond');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (3, '2021/03/15 12:00:00', 'I hung out with my friend Victorina');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (3, '2021/02/24 11:00:00', 'I hung out with my friend Sage');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (3, '2021/02/13 01:00:00', 'I hung out with my friend Lynette');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (3, '2021/01/4 23:00:00', 'I hung out with my friend Darryl');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (3, '2021/01/12 21:00:00', 'I hung out with my friend Hildegard');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (3, '2021/03/5 07:00:00', 'I hung out with my friend Ariana');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (3, '2021/02/25 22:00:00', 'I hung out with my friend Margorie');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (3, '2021/01/8 08:00:00', 'I hung out with my friend Maye');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (3, '2021/02/18 02:00:00', 'I hung out with my friend Monroe');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (3, '2021/01/28 01:00:00', 'I hung out with my friend Reena');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (3, '2021/03/15 00:00:00', 'I hung out with my friend Jeremy');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (3, '2021/02/19 16:00:00', 'I hung out with my friend Tamiko');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (3, '2021/03/13 03:00:00', 'I hung out with my friend Dorsey');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (3, '2021/02/10 19:00:00', 'I hung out with my friend Cori');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (3, '2021/02/6 07:00:00', 'I hung out with my friend Rosette');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (3, '2021/01/4 21:00:00', 'I hung out with my friend Tyler');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (3, '2021/02/28 00:00:00', 'I hung out with my friend Lora');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (3, '2021/03/9 14:00:00', 'I hung out with my friend Tyron');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (3, '2021/02/11 07:00:00', 'I hung out with my friend Queen');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (3, '2021/02/9 19:00:00', 'I hung out with my friend Leland');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (3, '2021/03/17 07:00:00', 'I hung out with my friend Rozella');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (3, '2021/03/14 14:00:00', 'I hung out with my friend Sharron');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (3, '2021/02/28 22:00:00', 'I hung out with my friend Delores');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (3, '2021/02/9 20:00:00', 'I hung out with my friend Lucinda');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (3, '2021/01/8 06:00:00', 'I hung out with my friend Willy');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (3, '2021/01/4 06:00:00', 'I hung out with my friend Erik');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (3, '2021/02/1 14:00:00', 'I hung out with my friend Jarod');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (3, '2021/02/18 20:00:00', 'I hung out with my friend Hanna');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (3, '2021/02/9 11:00:00', 'I hung out with my friend Romona');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (3, '2021/01/28 16:00:00', 'I hung out with my friend Lazaro');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (3, '2021/01/9 04:00:00', 'I hung out with my friend Donna');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (3, '2021/02/25 08:00:00', 'I hung out with my friend Marylynn');

INSERT INTO DIARYENTRY (patientID, entry_date, entry) VALUES (3, '2021/01/8 09:00:00', 'I hung out with my friend Elise');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/02/22 21:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/03/5 08:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/01/25 08:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/02/14 08:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/01/27 20:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/01/25 02:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/02/10 18:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/03/4 18:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/02/9 06:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/02/10 18:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/01/2 18:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/01/12 02:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/01/4 21:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/01/23 07:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/03/5 03:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/02/3 03:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/01/15 05:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/01/11 05:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/02/25 15:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/03/1 05:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/01/5 21:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/02/5 14:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/03/2 04:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/03/2 04:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/03/5 14:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/02/16 12:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/02/10 04:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/01/24 06:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/01/10 21:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/03/5 01:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/02/6 15:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/02/17 21:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/01/1 05:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/03/4 06:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/03/2 19:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/01/9 02:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/03/1 22:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/03/2 06:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/01/1 17:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/03/2 07:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/01/21 12:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/01/10 06:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/03/2 22:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/01/2 23:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/01/1 23:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/02/28 01:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/01/11 06:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/01/19 00:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/01/5 01:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/02/24 05:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/01/5 02:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/02/26 12:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/02/11 14:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/03/5 13:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/03/1 23:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/02/25 00:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/02/24 02:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/03/1 09:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/02/18 07:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/01/4 11:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/03/3 16:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/01/19 19:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/01/22 18:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/01/19 14:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/01/5 22:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/02/17 18:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/03/4 22:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/02/17 00:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/03/1 15:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/03/4 03:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/03/5 11:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/03/2 06:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/03/4 05:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/02/27 13:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/01/9 22:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/01/2 20:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/01/14 13:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/01/10 05:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/03/5 12:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/01/11 19:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/02/22 14:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/01/8 14:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/03/3 18:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/03/4 16:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/02/17 20:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/01/6 22:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/03/2 14:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/02/13 06:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/03/3 15:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/01/1 13:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/02/11 05:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/01/18 08:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/03/4 06:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/01/26 10:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/02/2 11:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/03/5 02:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/02/19 02:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/03/4 03:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/01/14 23:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/03/5 06:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/03/4 13:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/03/1 01:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/03/4 01:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/01/26 02:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/03/4 01:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/01/14 02:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/01/11 22:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/03/2 07:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/03/3 09:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/01/13 15:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/01/24 21:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/01/15 12:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/03/1 18:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/02/25 06:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/03/3 00:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/03/2 20:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/02/19 03:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/01/9 09:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/01/27 09:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/03/1 01:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/01/19 07:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/01/1 21:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/02/13 21:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/03/1 03:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/02/6 21:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/02/2 15:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/01/12 00:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/01/26 04:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/02/13 10:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/01/28 12:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/01/2 18:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/01/25 15:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/03/4 00:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/01/21 20:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/03/5 11:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/02/24 19:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/02/8 11:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/01/9 23:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/01/13 07:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/01/19 04:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/01/25 21:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/02/19 07:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/03/2 11:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/03/3 06:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/02/20 00:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/02/26 07:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/03/3 04:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/03/4 12:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/02/3 13:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/02/28 19:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/01/2 17:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/03/3 23:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/01/11 07:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/02/8 09:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/01/10 06:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/02/9 06:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/01/13 22:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/01/26 10:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/01/19 12:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/02/24 22:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/01/9 17:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/01/19 17:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/03/3 20:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/01/25 19:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/02/7 06:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/01/16 14:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/02/17 13:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/02/7 11:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/01/25 18:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/01/9 01:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/01/11 05:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/01/22 15:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/02/6 21:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/01/6 09:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/01/5 17:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/02/3 06:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/01/5 00:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/03/5 06:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/03/2 10:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/02/27 04:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/02/5 00:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/01/24 07:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/01/14 18:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/01/23 15:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/03/5 14:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/03/5 00:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/01/2 19:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/02/21 00:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/03/4 04:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (1, '2021/01/15 06:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/01/2 09:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/01/19 12:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/02/4 05:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/03/5 20:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/01/10 00:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/02/17 09:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/02/3 11:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/02/19 19:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/03/2 19:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/03/2 12:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/02/21 06:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/03/1 18:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/02/22 07:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/03/2 18:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/03/1 05:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/02/4 06:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/01/20 08:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/02/10 11:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/02/16 20:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/03/3 22:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/01/14 00:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/02/19 12:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/03/3 01:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/01/3 14:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/01/5 05:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/02/24 07:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/01/1 05:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/02/1 14:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/02/7 10:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/01/16 21:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/02/13 17:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/01/5 18:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/01/21 04:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/02/9 07:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/03/4 19:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/01/22 17:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/03/4 20:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/02/10 21:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/02/21 12:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/01/7 08:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/03/2 13:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/02/8 23:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/01/16 18:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/02/23 01:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/02/11 15:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/02/13 18:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/03/4 23:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/02/7 03:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/01/11 01:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/03/5 21:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/02/6 12:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/02/8 18:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/03/5 12:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/02/18 23:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/03/2 13:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/02/26 18:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/02/20 18:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/02/13 06:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/01/5 01:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/03/1 14:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/03/4 00:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/02/7 11:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/02/15 14:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/02/24 19:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/02/25 11:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/01/25 14:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/03/1 20:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/03/2 10:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/01/21 20:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/03/2 09:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/01/26 10:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/03/5 09:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/03/4 13:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/01/21 02:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/02/22 22:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/02/23 21:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/02/17 05:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/03/4 03:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/01/16 15:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/03/5 06:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/03/4 19:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/01/27 04:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/02/19 10:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/02/22 18:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/01/13 00:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/02/8 02:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/01/20 19:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/01/14 08:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/01/28 22:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/02/8 13:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/03/1 21:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/03/3 05:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/03/4 20:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/02/6 17:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/03/1 16:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/01/23 12:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/02/14 07:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/01/24 21:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/02/27 06:00:00');

INSERT INTO FALL (patientID, fall_date) VALUES (2, '2021/02/21 03:00:00');
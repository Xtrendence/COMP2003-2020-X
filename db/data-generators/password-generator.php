<!DOCTYPE html>
<html>
	<head>
		<style>
			:root {
				--font-family: "Helvetica Neue", "Lucida Grande", "Arial", "Verdana", "Tahoma", sans-serif;
			}
			html {
				font-family: var(--font-family);
			}
			body {
				background: rgb(20,20,20);
				color: rgb(255,255,255);
				margin: 0;
				padding: 0;
				font-size: 0;
				overflow-x: hidden;
				overflow-y: visible;
			}
			textarea {
				width: calc(100% - 60px);
				padding: 10px;
				display: block;
				margin: 20px auto 0 auto;
				border-radius: 10px;
				height: 400px;
				background: rgb(40,40,40);
				outline: none;
				border: none;
				color: rgb(255,255,255);
				font-size: 16px;
				resize: none;
				font-family: var(--font-family);
			}
			textarea:last-of-type {
				margin-bottom: 20px;
			}
		</style>
		<title>Hashed Password Generator</title>
	</head>
	<body>
		<textarea id="hashed"><?php set_time_limit(120); $passwords = ["ae8tri31", "cuarbs2not1mui6", "pri44d1", "keoorc0d03", "f99mro", "4cay9zr8", "tn4iec9f6ciis", "s2aiuost9c7c", "ts123iu", "aeyr43w6", "8nat24", "tp7o8d2ir", "4el2cyc1", "i69kl8e", "a92ks4rp", "syl713ejlifh", "9bncrd4eiel9i", "teep59s6", "ed2gr3ee8", "u69cd8k", "sr9ee3etd4d", "21ebl9l", "70igl3earf", "o6osh48lc", "csslay63", "gruf6tl77ae", "s5ao4k8", "seh17o", "3y15fr", "eipsod34l5d", "sb9pue9r1", "ebka334", "i70f8rst", "e2b1u2nco", "nnttecopm9i6e1", "4uy1pmtl9li", "6i0et7", "a6ard1leb8o", "4ppi37e", "1cgar9ra2ie", "0il1l3", "4lio6bin1g", "ee95b0lr", "nu4t6a7", "a1bcp7celat9e", "po15c8htysci", "tce0nij15", "t5isymesr8uo2", "i5ll75h", "nnaug2a2e3sti", "rle0bte9ir3", "t1oua6mn", "vcteeel670si", "regi333t", "e5ar7k7", "nei3nggtifh1r", "6rt6is6", "8udo8rp", "u7l8fi7lskl", "ld84ikaas5clicaa", "2ved53gniert", "gpu36or1", "u6alpret1pe8", "yea6h74d", "re6ra7dw9", "1d4soira9nus", "w5ay48", "8ru9esf0f", "r7di56t", "4e07seratw", "u45n0lg", "spel211e", "7ow94rc", "wol265s", "fsa6wul7e5t", "9r9yian", "77htog7u", "8s6atre5", "3y4b4ur", "biu86f3aetul", "12ad6jde", "xi3ed48f", "ro4en6s5p", "unopllio70t9", "8l94ucry", "yr1as3p", "s9oymt23r", "ib1tdyr9h5a", "7su7g8stge", "y1cault62al", "mix748", "eb95rs4ui", "c9lu7han9", "ck67si6", "yene496d", "l5oa84ltvie", "3crutcal7la2o", "e265dbs", "nmi2edda7g4n", "47ednyct3en", "a05nsek7", "4evr8ba7", "5mie5rn8d", "d9e5pw9or", "nny7n1i2aog", "la1z4y0", "87inve", "7i8ntex5scee", "wog0l14", "iolpla4ci1t", "oh65alisuir2", "po6e17k", "1trg1fitluen9", "d7pe0ld9a", "6p6u9tpiy", "hn8ad07", "tmr9-geo22ln", "1e3ms5t", "18oro5m", "2ali1e2mrat", "on293yarird", "orsu1b6t", "m25om9", "i3kc7k3", "eturc8n14r", "1n6d1ik", "n3i5a2bot", "oe9gs3np8", "cbb1rsi6e0l", "ds4l5i1o", "doio3nae7drtc2", "4e4k0rsapl", "3dr6ur9me", "edf977a", "5rre1madi4", "h9n4c7i", "vebia06h5ro", "9rd4i9eocsv", "7ar4c8t", "ktboo20eno1", "an6o2idi0td", "et5d2v5nra", "2woman16", "iovc0sa74viu", "pst44r6a", "ssqu5ah84", "6de5ld6um", "te0re57", "lesfh697", "edctir640", "50elveniju3", "ena03l6xip", "rcuts6i5", "e299ersdt", "omhlea4nsd64y", "7a1w8etr", "bz86u3z", "s4me8umoto9n", "te64vro5", "bal61l6", "9ntscem2ar4i", "2so56n", "n1w4o3", "esrt64e7", "es06or9mpi", "de85nfiat3", "ecor7at42r", "eo3lp07edv", "lc2i4unde1", "as21c3k", "aw34ykc2", "k2oc4e5h", "t2gvureohr2w2o", "4cop5e6pr", "a555esmly", "eno1e7dibt4", "ratostr80n9p", "5o0leos1bet", "apck54", "p94ocmleet", "e4e8zomim2r", "6daam85eg", "la098pi", "65cssti9k", "ihorso449b", "57egpses3anr", "u97t9g", "sg3inre5vih8", "t2y4sioec9", "22cab1k", "c9ui2yj8", "2rgennehst38t", "se9y8zt1", "9l6arn7ege", "6l59eas", "ul4p71my", "5c1irt1omaa", "e4gar8e5", "e8ad9et9rstc", "4l9ypsp6o"]; foreach ($passwords as $password) { echo '"' . password_hash($password, PASSWORD_DEFAULT) . '", '; } ?></textarea>
	</body>
</html>
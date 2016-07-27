<?php


// Fetch the webdata

function fetchURL($url) {
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
	curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1)');
	curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
	$data = curl_exec($ch);
	
	if(curl_errno($ch))
	{
		echo 'error:' . curl_error($ch);
		exit;
	}
	curl_close($ch);
	return $data;
}

$url = "http://www.autotrader.com/car-dealers/Las+Vegas+NV-89130/1853797/Team+Ford+Lincoln?city=Phoenix+AZ&endYear=2015&listingType=used&listingTypes=used&parameter1=Used+Cars&searchRadius=10&startYear=1981&zip=85009";
$listingURL = "http://m.autotrader.com/cars-for-sale/vehicledetails.xhtml?listingId=";

$header = 'category, id, title, url, address, city, country, neighborhood, state, zip_code,  body_type, color, condition, create_time, currency, dealer_phone, description, expire_time, featurs, fee, image_url, interior_color, ip_address, make, mileage, mileage_units, model, price, registration, seller_email, seller_name, seller_phone, seller_type, seller_url, transmission, vin, year';


$url_content = fetchURL($url);
# Create a DOM parser object
$dom = new DOMDocument();
$productDom = new DOMDocument();
@$dom->loadHTML($url_content);

$classname="atcui-block ";
$finder = new DomXPath($dom);
$product_urls = $finder->query("//*[contains(@class, '$classname')]");

$file = 'autoparse.csv';
$fp = fopen($file, 'w');

fputcsv($fp, explode(',', $header));



foreach($product_urls as $link) {
	$row = array();
	$linkURL = $link->getAttribute( 'href' );
	
	if(preg_match('/listingId=(?P<lintingID>\d+)/', $linkURL, $matches)) {
		$listingId = $matches['lintingID'];
		
		$productURL = $listingURL . $listingId;
		$productUrlContent = fetchURL($productURL);
		@$dom->loadHTML($productUrlContent);
		
		// Get the title - atcui-header-item
		$productFinder = new DomXPath($dom);
		$title = trim($productFinder->query("//*[contains(@class, 'atcui-header') and contains(@class, 'atcui-primary')]")->item(0)->nodeValue);
		
		
		// Get the Address1
		$address = $productFinder->query("//*[contains(@class, 'address1')]")->item(0)->nodeValue;
		
		// CityStateZip
		$cityStateZipData = $productFinder->query("//*[contains(@class, 'cityStateZip')]")->item(0)->nodeValue;		
		$cityStateZip = preg_match('/(?P<city>.+), (?P<state>\w+) (?P<zip>\d+)/', $cityStateZipData, $addrMatches);		
		$city = $addrMatches['city'];
		$state = $addrMatches['state'];
		$zip = $addrMatches['zip'];
		$country = 'USA'; // Default
		
		// Body Type
		$bodyType = $productFinder->query("//*[contains(@class, 'atcui-capitalize')]")->item(0)->nodeValue;
		
		// Color
		$colors = $productFinder->query("//*[contains(@class, 'atcui-colorSwatch')]");
		$color_code = 0;
		foreach($colors as $color) {
			$productColorArr = explode(" ", $color->getAttribute( 'class' ));
			$productColor[$color_code++] = $productColorArr[3];
			
		}
		$condition = 'new'; // condition
		$create_time = time(); // Create Time
		$currency = 'usd'; // Currenncy
		// price / fee
		$price = $productFinder->query("//*[contains(@class, 'price-value')]")->item(0)->nodeValue;
		
		// image url
		$image_url = $productFinder->query("//*[contains(@class, 'atcui-vehicle-image ')]")->item(0)->getAttribute('src');
		
		// mileage
		$mileage = 	$productFinder->query("//*[contains(@class, 'atcui-fuel-economy')]")->item(0)->nextSibling->nextSibling->nodeValue;
		
		
		$findCarListingDetails = $productFinder->query("//*[contains(@class, 'findcar-listingDetail')]");
		
		foreach($findCarListingDetails as $carDetail) {
			$carDetailNode = $carDetail->nodeValue;
			if(strstr($carDetailNode, 'TRANSMISSION')) {
				$transmission = trim(str_replace('TRANSMISSION', '', $carDetailNode));
			}
			if(strstr($carDetailNode, 'VIN')) {
				$vin = trim(str_replace('VIN', '', $carDetailNode));
			}
		}
		
		// Description 
		// mileage
		$description = 	trim($productFinder->query("//*[contains(@class, 'atcui-expand-body ')]")->item(0)->nodeValue);		
		$phone = $productFinder->query("//*[contains(@data-lead-type, 'PHONE')]")->item(0)->nodeValue;
		
		$dealer_name = $productFinder->query("//*[contains(@class, 'mdot-dealerDetails')]")->item(0)->previousSibling->previousSibling->nodeValue;
		
		$row['category'] = '';
		$row['id'] = '';
		$row['title'] = $title;
		$row['url'] = '';
		$row['address'] = $address;
		$row['city'] = $city ;
		$row['country'] = $country;
		$row['neighborhood'] = '';
		$row['state'] = $state;
		$row['zip_code'] = $zip;
		$row['body_type'] = $bodyType;
		$row['color'] = $productColor[0];
		$row['condition'] = $condition;
		$row['create_time'] = $create_time;
		$row['currency'] = $currency;
		$row['dealer_phone'] = $phone;
		$row['description'] = $description;
		$row['expire_time'] = '';
		$row['featurs'] = '';
		$row['fee'] = $price;
		$row['image_url'] = $image_url;
		$row['interior_color'] = $productColor[1];
		$row['ip_address'] = '';
		$row['make'] = '';
		$row['mileage'] = $mileage;
		$row['mileage_units'] = '';
		$row['model'] = '';
		$row['price'] = $price;
		$row['registration'] = '';
		$row['seller_email'] = '';
		$row['seller_name'] = $dealer_name;
		$row['seller_phone'] = $phone;
		$row['seller_type'] = '';
		$row['seller_url'] = '';
		$row['transmission'] = $transmission;
		$row['vin'] = $vin;
		$row['year'] = '';
	
	
		fputcsv($fp, $row);
		
		
	}
	
	

}

fclose($fp);

echo "Data has been saved successfully in autoparse.csv file.";



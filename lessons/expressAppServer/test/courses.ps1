$baseUrl = 'http://localhost:3000'


$testbody = ''
$expectedResponseStatus = '200'
$response = iwr -Uri $baseUrl'/api/courses/1' -Method 'GET'

if($response.StatusCode -ne $expectedResponseStatus)
    { "Test 1 Fail" }


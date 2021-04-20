package getNodes

import (
	"encoding/json"
	"fmt"
	"k8api/getdata"
	"k8api/model"
)

func GetNodes(){

	url := "localhost:8080/apis/metrics.k8s.io/v1beta1/nodes"
	responseData := getdata.Getdata(url)

	var NodeResponseObject model.NodeMetrics
	json.Unmarshal(responseData, &NodeResponseObject)
	fmt.Println(NodeResponseObject)
}

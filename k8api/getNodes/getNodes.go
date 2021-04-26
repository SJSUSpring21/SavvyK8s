package getNodes

import (
	"encoding/json"
	"k8api/getdata"
	"SavvyK8s/k8api/model"
)

func GetNodes() model.NodeMetrics{

	url := "localhost:8080/apis/metrics.k8s.io/v1beta1/nodes"
	responseData := getdata.Getdata(url)

	var NodeResponseObject model.NodeMetrics
	json.Unmarshal(responseData, &NodeResponseObject)

	return NodeResponseObject
}

package getPods

import (
	"encoding/json"
	"fmt"
	"k8api/getdata"
	"SavvyK8s/k8api/model"
)

func GetPods() model.PodMetrics{

	url := "http://127.0.0.1:8080/apis/metrics.k8s.io/v1beta1/namespaces/default/pods"
	responseData := getdata.Getdata(url)


	var PodResponseObject model.PodMetrics
	json.Unmarshal(responseData, &PodResponseObject)

	fmt.Println(PodResponseObject)

	return PodResponseObject
}
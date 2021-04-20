package model


type PodMetrics struct{

	Kind string `json:":"kind"`
	ApiVersion string `json:":"apiVersion"`
	Metadata string `json:":""`
	SelfLink string `json:":"selfLink"`
	Pods []Pod `json:":"items"`
}


type Pod struct {
	MetadataPods MetadataPod `json:"metadata"`
	Timestamp string `json:"timestamp"`
	Window string `json:"window"`
	Containers []Container `json:"containers"`
}



type MetadataPod struct {
	Name string `json:":"name"`
	Namespace string `json:":"namespace"`
	SelfLink string `json:":"selfLink"`
	CreationTimestamp string `json:":"creationTimestamp"`
}

type Container struct{
	Name string `json:"name"`
	PodUsages []PodUsage `json:"usage"`
}


type PodUsage struct{
	Cpu string `json:"cpu"`
	Memory string `json:"memory"`
}
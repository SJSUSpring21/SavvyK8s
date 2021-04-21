package k8Proxy

import (
	"fmt"
	"os/exec"
)

func K8sProxy(){

	out, err := exec.Command("kubectl", "proxy", "--port=8080").Output()
	if err != nil {
		fmt.Printf("%s", err)
	}
	fmt.Println("Command Successfully Executed")
	output := string(out[:])
	fmt.Println(output)

}

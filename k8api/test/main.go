package main

import (
	"fmt"
	"os/exec"
)


func main(){

	out, err := exec.Command("ls", "-ltr").Output()
	if err != nil {
		fmt.Printf("%s", err)
	}
	fmt.Println("Command Successfully Executed")
	output := string(out[:])
	fmt.Println(output)

}

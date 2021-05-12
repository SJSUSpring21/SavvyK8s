package mailAlert

import (
	"fmt"
	"net/smtp"
	"strconv"
)

func (s *smtpServer) Address() string {
	return s.host + ":" + s.port
}

func MailAlert(item string,item_name string, metric_type string, metric_val int64){


	from := "cmpe272team18@gmail.com"
	password := "Kubernetes@cmpe"



	// Receiver email address to be set

	to := []string{
		"sarvesh.upadhye@gmail.com",
	}

	smtpServer := smtpServer{host: "smtp.gmail.com", port: "587"}



	var message []byte
	if item=="node"{
		if metric_type=="memory"{
			m1:="The memory usage of Node: "
			m2:=item_name
			m3:=" is above threshold. Memory Usage:"
			m4:=metric_val
			m5:="Mi"
			message=[]byte(m1+m2+m3+strconv.FormatInt(m4, 10)+m5)

			auth := smtp.PlainAuth("", from, password, smtpServer.host)
			err := smtp.SendMail(smtpServer.Address(), auth, from, to, message)
			if err != nil {
				fmt.Println(err)
			}
		} else {
			m1:="The CPU usage of Node:"
			m2:=item_name
			m3:=" is above threshold. CPU Usage:"
			m4:=metric_val
			m5:="mCores"
			message=[]byte(m1+m2+m3+strconv.FormatInt(m4, 10)+m5)

			auth := smtp.PlainAuth("", from, password, smtpServer.host)
			err := smtp.SendMail(smtpServer.Address(), auth, from, to, message)
			if err != nil {
				fmt.Println(err)
			}

		}


	} else {
		if metric_type=="memory"{
			m1:="The memory usage of Pod:"
			m2:=item_name
			m3:=" is above threshold. Memory Usage:"
			m4:=metric_val/1024
			m5:="Mi"
			message=[]byte(m1+m2+m3+strconv.FormatInt(m4, 10)+m5)

			auth := smtp.PlainAuth("", from, password, smtpServer.host)
			err := smtp.SendMail(smtpServer.Address(), auth, from, to, message)
			if err != nil {
				fmt.Println(err)
			}

		} else {
			m1:="The CPU usage of Pod:"
			m2:=item_name
			m3:=" is above threshold. CPU Usage:"
			m4:=metric_val
			m5:="mCores"
			message=[]byte(m1+m2+m3+strconv.FormatInt(m4, 10)+m5)
			message=[]byte(m1+m2+m3+strconv.FormatInt(m4, 10))

			auth := smtp.PlainAuth("", from, password, smtpServer.host)
			err := smtp.SendMail(smtpServer.Address(), auth, from, to, message)
			if err != nil {
				fmt.Println(err)
			}

		}
	}


}


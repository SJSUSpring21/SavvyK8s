package mailAlert

import (
	"crypto/tls"
	"fmt"
	"strconv"
	gomail "gopkg.in/mail.v2"
)


func MailAlert(item string,item_name string, metric_type string, metric_val int64){





	m := gomail.NewMessage()


	m.SetHeader("From", "cmpe272team18@gmail.com")
	m.SetHeader("To", "bharathjagini@gmail.com")


	if item=="Node"{
		if metric_type=="memory"{
			m1:="The memory usage of Node: "
			m2:=item_name
			m3:=" is above threshold. Memory Usage:"
			m4:=metric_val
			m5:="Mi"
			subject:=item_name+"Node Memory usage Alert"
			m.SetHeader("Subject", subject)
			message:=m1+m2+m3+strconv.FormatInt(m4, 10)+m5
			m.SetBody("text/plain", message)

			d := gomail.NewDialer("smtp.gmail.com", 587, "cmpe272team18@gmail.com", "Kubernetes@cmpe")
			d.TLSConfig = &tls.Config{InsecureSkipVerify: true}
			if err := d.DialAndSend(m); err != nil {
				fmt.Println(err)
				panic(err)
			}


		} else if metric_type=="cpu" {
			m1:="The CPU usage of Node: "
			m2:=item_name
			m3:=" is above threshold. CPU Usage:"
			m4:=metric_val
			m5:="mCores"
			subject:=item_name+"Node CPU usage Alert"
			m.SetHeader("Subject", subject)
			message:=m1+m2+m3+strconv.FormatInt(m4, 10)+m5
			m.SetBody("text/plain", message)

			d := gomail.NewDialer("smtp.gmail.com", 587, "cmpe272team18@gmail.com", "Kubernetes@cmpe")
			d.TLSConfig = &tls.Config{InsecureSkipVerify: true}
			if err := d.DialAndSend(m); err != nil {
				fmt.Println(err)
				panic(err)
			}

		}


	}else if item=="Pod" {
		if metric_type=="memory"{
			m1:="The Memory usage of Pod: "
			m2:=item_name
			m3:=" is above threshold. Memory Usage:"
			m4:=metric_val
			m5:="Mi"
			subject:=item_name+" Pod memory usage Alert"
			m.SetHeader("Subject", subject)
			message:=m1+m2+m3+strconv.FormatInt(m4, 10)+m5
			m.SetBody("text/plain", message)

			d := gomail.NewDialer("smtp.gmail.com", 587, "cmpe272team18@gmail.com", "Kubernetes@cmpe")
			d.TLSConfig = &tls.Config{InsecureSkipVerify: true}
			if err := d.DialAndSend(m); err != nil {
				fmt.Println(err)
				panic(err)
			}

		} else if metric_type== "cpu" {
			m1:="The CPU usage of Pod: "
			m2:=item_name
			m3:=" is above threshold. /n CPU Usage:"
			m4:=metric_val
			m5:="mCores"
			subject:=item_name+" Pod CPU usage Alert"
			m.SetHeader("Subject", subject)
			message:=m1+m2+m3+strconv.FormatInt(m4, 10)+m5
			m.SetBody("text/plain", message)

			d := gomail.NewDialer("smtp.gmail.com", 587, "cmpe272team18@gmail.com", "Kubernetes@cmpe")
			d.TLSConfig = &tls.Config{InsecureSkipVerify: true}
			if err := d.DialAndSend(m); err != nil {
				fmt.Println(err)
				panic(err)
			}


		}
	}


}


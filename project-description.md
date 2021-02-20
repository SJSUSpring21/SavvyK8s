# Project Idea - *K8s Monitoring and Handling tool*

### Introduction
Kubernetes or K8s is an open-source container-orchestration system for automating computer application deployment, scaling, and management. The default way to handle and monitor different K8s is through command line interface. CLI makes it difficult to monitor multiple aspects of the cluster at once, in a continuous way. Monitoring is required to anticipate problems and have a visibility over potential bottlenecks. Our objective is to create a UI based monitoring tool where users will be able to monitor different resources (cluster, pod, application etc.) through a UI.

## Abstract
We will build an application to visualize and monitor the K8s cluster resources through a graphical user interface. The application will have real time usage charts, and will notify users via email or browser notifications on reaching thresholds as set by the users. 

## Approach
**Input: What information are we going to get from the K8s**

K8s cluster metrics, node resources metrics, container metrics, application metrics, health checks etc. 

**Process:**
We will be converting continuous data and metrics to graphs, checking threshold limits along the way.

**Output:**
Graphical representation of metrics, aggregated data and email or browser notifications for threshold limits.

**Persona:**
The target audience will be software engineers, devops engineers, project managers etc.



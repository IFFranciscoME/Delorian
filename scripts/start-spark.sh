#!/bin/bash

# Set Spark home directory
SPARK_HOME=/path/to/your/spark

# Start Spark Connect server
$SPARK_HOME/sbin/start-connect-server.sh --packages org.apache.spark:spark-connect_2.12:3.5.0

# Delorian

Assemble DeFi Data Artifacts Based on Delta in Time Approach.

## Architecture

```mermaid
sequenceDiagram
autonumber

participant Channel as [Topic] <br/> LendingActivity
participant Connector-WebSocket as [Connector] <br/> WebSocket
participant Connector-RPC as [Connector] <br/> JSON-RPC
participant Job-ETL as [Job] <br/> Data Processor
participant DL as [Storage] <br/> DataLake

Note over Connector-WebSocket : [Message-Event] <br/> New Minted Block

Connector-WebSocket ->> Channel: Message-Event Push
Connector-RPC ->> Channel: Message-Event Pull

par Extract
	Connector-RPC --> Connector-RPC: Fetch Pool Data
	Connector-RPC --> Connector-RPC: Fetch Users Data
	Connector-RPC --> Connector-RPC: Parse Data
end

Note over Connector-RPC : [Data-Event] <br/> New Raw Dataset
Connector-RPC ->> Channel: Data-Event Push
Job-ETL ->> Channel: Data-Event Pull

par Transform
	Job-ETL --> Job-ETL: Calculate & <br/> Metrics
	Job-ETL --> Job-ETL: Aggregate & <br/> Data
end

par Load
	Job-ETL -->> DL: Data Ingestion
end

Note over Job-ETL : [Message-Event] <br/> Updated Aggregated Dataset

Job-ETL ->> Channel: Message Event Push
```

## Usage

1. Build infrastructure docker 

```
./scripts/build-service.sh
```

2. Run WebSocket connector

```shell
npx ts-node connector_websocket.ts
```

3. Run JSON-RPC connector

```shell
npx ts-node connector_websocket.ts
```

## Deployment

This functionality is going to be deployed as with the Infrastructure build with a variation of the [Astronomer](https://github.com/IFFranciscoME/astronomer) project.

And for the 

## Dependencies

The aave library has a peer dependency of ehters on its v5, and it wont work with v6

```shell
npm install ethers@5
```

Then the aave libraries can be installed

```shell
npm install @aave/contract-helpers @aave/math-utils
```

And, another useful utility would be the adress book as wallet address catalog.

```shell
npm install @bgd-labs/aave-address-book
```

Install PostgreSQL

```
npm install pg @types/pg
```

## Roadmap

- Include testing with [ts-jtest](https://kulshekhar.github.io/ts-jest/docs/)

Create a Risk Metric based on Hawkes point process, in order to provide the probability of observing a cluster of liquidations. Rust, docker, shell, clickhouseDB.

- Part 1 : A data reader (historical batches) from the postgreSQL DB, to then store them as calibration data into a Clickhouse DB
- Part 2 : Definition of the model, parameters and its calibration process. Which is going to be a Multivariate Hawkes Process for Self-exciting point process, as a variation of this rust based implementation [atelier::generators/hawkes.rs](https://github.com/IteraLabs/atelier/blob/main/atelier/src/generators/hawkes.rs) of expected arrival of events, in this case, Liquidation Events. 
- Part 3 : Atelier container for execution of the calibration, versioning and storage of calibration results into ClickhouseDB.
- Part 4 : A clickhouse DB Instance within a container in the server.
- Part 5 : Streaming of risk metric: Probability of observing a Cluster of liquidations.
- Part 6 : Publish metric into a blockchain using a smart contract.


# Delorian

Assemble Data Artifacts Based on a Given Delta in Time of a Blockchain's Transaction Data Layer.

## Project Structure

```
delorian/
│ 
├── scripts/
│   └── start-service.sh
│ 
├── src/
│   ├── config/
│   │   └── kafka.ts
│   ├── consumers/
│   │   └── messageConsumer.ts
│   ├── models/
│   │   └── message.ts
│   ├── producers/
│   │   └── messageProducer.ts
│   ├── utils/
│   │   └── logger.ts
│   ├── testPublisher.ts
│   │── testSubscriber.ts
│   └── index.ts
│ 
├── .gitignore
├── docker-compose.yml
├── package.json
├── tsconfig.json
└── README.md
```

## Roadmap

- Include a data-pipeline with a Fetcher and a Exporter
- Include a data-lake with an SQL instance
- Include some rust-code for data transformations as a PoC MLOps ETL
- Include a data-warehouse with an SQL instance
- Include testing with [ts-jtest](https://kulshekhar.github.io/ts-jest/docs/)


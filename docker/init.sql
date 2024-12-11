
-- Create the user_metrics table
CREATE TABLE user_metrics (
    id SERIAL PRIMARY KEY,
    collateral VARCHAR(255),
    borrowed FLOAT,
    health_index FLOAT,
    status VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Base de données PAWW - Schéma complet pour collier connecté

-- ========================================
-- TABLES PRINCIPALES
-- ========================================

-- Table des utilisateurs
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    date_of_birth DATE,
    address_line1 VARCHAR(255),
    address_line2 VARCHAR(255),
    city VARCHAR(100),
    postal_code VARCHAR(20),
    country VARCHAR(100) DEFAULT 'France',
    profile_picture_url VARCHAR(500),
    email_verified BOOLEAN DEFAULT FALSE,
    phone_verified BOOLEAN DEFAULT FALSE,
    terms_accepted BOOLEAN DEFAULT FALSE,
    privacy_policy_accepted BOOLEAN DEFAULT FALSE,
    marketing_emails BOOLEAN DEFAULT FALSE,
    account_status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login_at TIMESTAMP
);

-- Table des races (référentiel)
CREATE TABLE breeds (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    species VARCHAR(50) NOT NULL, -- dog, cat
    size_category VARCHAR(20), -- small, medium, large, giant
    weight_range_min DECIMAL(5,2), -- poids min en kg
    weight_range_max DECIMAL(5,2), -- poids max en kg
    life_expectancy_min INTEGER, -- espérance de vie min en années
    life_expectancy_max INTEGER, -- espérance de vie max en années
    activity_level VARCHAR(20), -- low, medium, high, very_high
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des animaux
CREATE TABLE pets (
    id SERIAL PRIMARY KEY,
    owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    breed_id INTEGER REFERENCES breeds(id),
    gender VARCHAR(10), -- male, female, unknown
    date_of_birth DATE,
    weight DECIMAL(5,2), -- en kg
    height DECIMAL(5,2), -- en cm
    color VARCHAR(100),
    microchip_number VARCHAR(50),
    profile_picture_url VARCHAR(500),
    medical_notes TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des colliers/dispositifs
CREATE TABLE devices (
    id SERIAL PRIMARY KEY,
    pet_id INTEGER REFERENCES pets(id) ON DELETE CASCADE,
    device_id VARCHAR(100) UNIQUE NOT NULL,
    device_name VARCHAR(100),
    device_type VARCHAR(50) DEFAULT 'collar',
    firmware_version VARCHAR(20),
    battery_level INTEGER, -- 0-100%
    is_active BOOLEAN DEFAULT TRUE,
    last_sync_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ========================================
-- MÉTRIQUES ET DONNÉES DU COLLIER
-- ========================================

-- Table des types de métriques
CREATE TABLE metric_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL, -- steps, heart_rate, calories, sleep, location, etc.
    unit VARCHAR(20), -- steps/day, bpm, kcal, hours, coordinates
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE
);

-- Table des métriques en temps réel (données du collier)
CREATE TABLE pet_metrics (
    id SERIAL PRIMARY KEY,
    pet_id INTEGER REFERENCES pets(id) ON DELETE CASCADE,
    device_id INTEGER REFERENCES devices(id) ON DELETE CASCADE,
    metric_type_id INTEGER REFERENCES metric_types(id),
    value DECIMAL(10,2) NOT NULL,
    recorded_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des métriques agrégées par jour
CREATE TABLE daily_metrics (
    id SERIAL PRIMARY KEY,
    pet_id INTEGER REFERENCES pets(id) ON DELETE CASCADE,
    metric_type_id INTEGER REFERENCES metric_types(id),
    date DATE NOT NULL,
    value_avg DECIMAL(10,2),
    value_min DECIMAL(10,2),
    value_max DECIMAL(10,2),
    value_sum DECIMAL(10,2),
    sample_count INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(pet_id, metric_type_id, date)
);

-- ========================================
-- BASE DE RÉFÉRENCE POUR COMPARAISONS
-- ========================================

-- Métriques de référence par race et âge
CREATE TABLE breed_metric_references (
    id SERIAL PRIMARY KEY,
    breed_id INTEGER REFERENCES breeds(id),
    metric_type_id INTEGER REFERENCES metric_types(id),
    age_group VARCHAR(20), -- puppy, young, adult, senior
    gender VARCHAR(10), -- male, female, all
    
    -- Seuils pour classification
    excellent_min DECIMAL(10,2),
    excellent_max DECIMAL(10,2),
    good_min DECIMAL(10,2),
    good_max DECIMAL(10,2),
    average_min DECIMAL(10,2),
    average_max DECIMAL(10,2),
    poor_min DECIMAL(10,2),
    poor_max DECIMAL(10,2),
    
    -- Statistiques générales
    population_average DECIMAL(10,2),
    population_std_dev DECIMAL(10,2),
    sample_size INTEGER,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(breed_id, metric_type_id, age_group, gender)
);

-- ========================================
-- RAPPORTS ET ANALYSES
-- ========================================

-- Table des rapports générés
CREATE TABLE health_reports (
    id SERIAL PRIMARY KEY,
    pet_id INTEGER REFERENCES pets(id) ON DELETE CASCADE,
    report_type VARCHAR(50), -- weekly, monthly, health_check, custom
    period_start DATE,
    period_end DATE,
    overall_score DECIMAL(3,1), -- Note globale sur 10
    report_data JSONB, -- Données complètes du rapport en JSON
    recommendations TEXT,
    alerts TEXT, -- Alertes santé détectées
    generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Scores de santé par métrique
CREATE TABLE health_scores (
    id SERIAL PRIMARY KEY,
    pet_id INTEGER REFERENCES pets(id) ON DELETE CASCADE,
    metric_type_id INTEGER REFERENCES metric_types(id),
    date DATE,
    score DECIMAL(3,1), -- Score sur 10
    classification VARCHAR(20), -- excellent, good, average, poor
    compared_to_breed BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(pet_id, metric_type_id, date)
);

-- ========================================
-- TABLES D'AUTHENTIFICATION
-- ========================================

-- Sessions utilisateur
CREATE TABLE user_sessions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    session_token VARCHAR(255) UNIQUE NOT NULL,
    refresh_token VARCHAR(255) UNIQUE,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_used_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address INET,
    user_agent TEXT
);

-- Codes de vérification
CREATE TABLE verification_codes (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    code VARCHAR(10) NOT NULL,
    type VARCHAR(20) NOT NULL, -- email_verification, phone_verification, password_reset
    expires_at TIMESTAMP NOT NULL,
    used_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ========================================
-- INDEX POUR PERFORMANCE
-- ========================================

-- Index utilisateurs
CREATE INDEX idx_users_email ON users(email);

-- Index animaux
CREATE INDEX idx_pets_owner_id ON pets(owner_id);
CREATE INDEX idx_pets_breed_id ON pets(breed_id);

-- Index dispositifs
CREATE INDEX idx_devices_pet_id ON devices(pet_id);
CREATE INDEX idx_devices_device_id ON devices(device_id);

-- Index métriques (très important pour performance)
CREATE INDEX idx_pet_metrics_pet_id ON pet_metrics(pet_id);
CREATE INDEX idx_pet_metrics_recorded_at ON pet_metrics(recorded_at);
CREATE INDEX idx_pet_metrics_type_id ON pet_metrics(metric_type_id);
CREATE INDEX idx_pet_metrics_pet_date ON pet_metrics(pet_id, recorded_at);

-- Index métriques quotidiennes
CREATE INDEX idx_daily_metrics_pet_date ON daily_metrics(pet_id, date);
CREATE INDEX idx_daily_metrics_type ON daily_metrics(metric_type_id);

-- Index références de race
CREATE INDEX idx_breed_refs_breed_metric ON breed_metric_references(breed_id, metric_type_id);

-- Index rapports
CREATE INDEX idx_health_reports_pet_id ON health_reports(pet_id);
CREATE INDEX idx_health_reports_period ON health_reports(period_start, period_end);

-- Index scores
CREATE INDEX idx_health_scores_pet_date ON health_scores(pet_id, date);

-- Index authentification
CREATE INDEX idx_sessions_user_id ON user_sessions(user_id);
CREATE INDEX idx_sessions_token ON user_sessions(session_token);

-- ========================================
-- TRIGGERS POUR UPDATED_AT
-- ========================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_pets_updated_at BEFORE UPDATE ON pets FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_devices_updated_at BEFORE UPDATE ON devices FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_breeds_updated_at BEFORE UPDATE ON breeds FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_breed_metric_references_updated_at BEFORE UPDATE ON breed_metric_references FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
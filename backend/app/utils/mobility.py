import numpy as np
import pandas as pd
import time
import schedule
from mongoengine import connect
from app.models.mobility import mobility
# MongoEngine model
# MongoDB connection
# connect(db='inter_state_mobility', host='mongodb://localhost:27017/')

# List of states and UTs with codes
states_ut = [
    'AP', 'KL', 'TR', 'AR', 'AS', 'BR', 'CG', 'GA', 'GJ', 'HR', 'HP', 'JK',
    'JH', 'KA', 'MP', 'MH', 'MN', 'ML', 'MZ', 'NL', 'OR', 'PB', 'RJ', 'SK',
    'TN', 'UK', 'UP', 'WB', 'AN', 'CH', 'DH', 'DD', 'DL', 'LD', 'PY'
]
n = len(states_ut)

# Approximate populations (in millions, 2025 estimates)
populations = {
    'AP': 55, 'KL': 35, 'TR': 4, 'AR': 1.5, 'AS': 35, 'BR': 125, 'CG': 30,
    'GA': 1.5, 'GJ': 70, 'HR': 30, 'HP': 7, 'JK': 14, 'JH': 40, 'KA': 70,
    'MP': 85, 'MH': 125, 'MN': 3, 'ML': 3, 'MZ': 1.2, 'NL': 2, 'OR': 45,
    'PB': 30, 'RJ': 80, 'SK': 0.7, 'TN': 80, 'UK': 12, 'UP': 240, 'WB': 100,
    'AN': 0.4, 'CH': 1.2, 'DH': 0.6, 'DD': 0.4, 'DL': 20, 'LD': 0.07, 'PY': 1.5
}

# Function to estimate distance category (simplified)
def get_distance_category(state1, state2):
    northeast = ['AR', 'AS', 'MN', 'ML', 'MZ', 'NL', 'TR']
    north = ['HP', 'JK', 'PB', 'HR', 'UK', 'DL', 'CH']
    central = ['UP', 'MP', 'CG', 'JH']
    west = ['GJ', 'MH', 'RJ', 'GA', 'DH', 'DD']
    south = ['AP', 'KA', 'KL', 'TN', 'PY']
    east = ['WB', 'OR', 'SK']
    islands = ['AN', 'LD']
    
    if state1 == state2:
        return 0
    if (state1 in northeast and state2 in south) or (state1 in south and state2 in northeast):
        return 3  # Long distance
    if (state1 in islands or state2 in islands):
        return 3
    if (state1 in northeast and state2 in northeast) or (state1 in south and state2 in south):
        return 1  # Short distance
    return 2  # Medium distance

# Function to generate mobility matrix
def generate_mobility_matrix():
    matrix = np.zeros((n, n))
    
    for i in range(n):
        for j in range(n):
            if i == j:
                continue
            # Base mobility: proportional to geometric mean of populations
            pop_i = populations[states_ut[i]]
            pop_j = populations[states_ut[j]]
            base = np.sqrt(pop_i * pop_j) * 100
            
            # Distance adjustment
            dist_cat = get_distance_category(states_ut[i], states_ut[j])
            if dist_cat == 1:
                base *= 1.5  # More travel for short distances
            elif dist_cat == 3:
                base *= 0.5  # Less travel for long distances
            
            # Economic hubs adjustment (e.g., DL, MH, KA, TN)
            hubs = ['DL', 'MH', 'KA', 'TN']
            if states_ut[i] in hubs or states_ut[j] in hubs:
                base *= 2
                
            # Transport mode allocation
            if dist_cat == 3 and (states_ut[i] in hubs and states_ut[j] in hubs):
                # More flights for long-distance hub-to-hub
                trains = base * 0.60
                buses = base * 0.20
                flights = base * 0.20
            else:
                trains = base * 0.70
                buses = base * 0.25
                flights = base * 0.05
            
            total = trains + buses + flights
            
            # Random variation (±10%)
            variation = np.random.uniform(0.9, 1.1)
            total *= variation
            
            # Cap at reasonable values (100 to 100,000)
            total = min(max(int(total), 100), 100000)
            
            matrix[i, j] = total
    
    return matrix

# Function to save matrix to MongoDB using MongoEngine
def save_to_mongodb(matrix):
    # Delete all existing documents in the collection
    mobility.objects.delete()
    
    # Prepare documents for insertion
    documents = []
    for i in range(n):
        for j in range(i+1,n):
            if i != j and matrix[i, j] > 0:
                documents.append(mobility(
                    state1=states_ut[i],
                    state2=states_ut[j],
                    mob=int(matrix[i, j])
                ))

    # Bulk insert with MongoEngine's insert()
    if documents:
        # insert() takes a list of Document instances
        mobility.objects.insert(documents, load_bulk=False)
        print(f'Inserted {len(documents)} documents into MongoDB at {time.ctime()}')
# Schedule the job to run every 48 mins

def function_to_run():
    schedule.every(48).minutes.do(lambda: save_to_mongodb(generate_mobility_matrix()))
    while True:
        schedule.run_pending()
        time.sleep(1)
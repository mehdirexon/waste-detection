import matplotlib.pyplot as plt

# Data
data = {
    "Egypt": 1311.8,
    "Algeria": 1375.7,
    "Jordan": 1452.3,
    "Albania": 1477.7,
    "Malaysia": 1553.6,
    "Qatar": 1554.6,
    "Kuwait": 1653.7,
    "Iran": 1696.1,
    "Iceland": 1705.5,
    "Malta": 1978.0,
    "Thailand": 1986.0,
    "Switzerland": 2020.4,
    "Norway": 2130.7,
    "Montenegro": 2265.4,
    "Australia": 3158.3,
    "China": 3643.1,
    "Japan": 4470.8,
    "Ukraine": 11306.2,
    "Armenia": 17470.1,
    "United States": 25163.8
}

# Sort the data
sorted_data = sorted(data.items(), key=lambda x: x[1], reverse=True)

# Extracting country names and values for plotting
countries = [x[0] for x in sorted_data]
values = [x[1] for x in sorted_data]

# Plotting
plt.figure(figsize=(14, 8))
bars = plt.bar(countries, values, color='blue')

# Highlight the first and last bars in purple
bars[0].set_color('purple')
bars[-1].set_color('purple')

iran_index = countries.index('Iran')
bars[iran_index].set_color('red')
# Add labels and title
plt.xlabel('Country', fontsize=14)
plt.ylabel('Waste (Kg/capita)', fontsize=14)
plt.title('Waste Production per Capita by Country (2018)', fontsize=16)
plt.xticks(rotation=45, ha='right', fontsize=12)
plt.yticks(fontsize=12)
plt.tight_layout()

# Save or display the plot
plt.show()

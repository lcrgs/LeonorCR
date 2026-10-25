import pyperclip

def px_to_percent(px, direction):
    if direction == 'h':
        return (px / 1440) * 100
    elif direction == 'v':
        return (px / 818) * 100
    else:
        return None

def main():
    print("Type 'q' to quit anytime.")
    while True:
        user_input = input("Enter px and direction (h for horizontal, v for vertical), e.g., '20 h': ").strip()
        if user_input.lower() == 'q':
            print("Bye! Have a lovely day! 💖")
            break

        parts = user_input.split()
        if len(parts) != 2:
            print("Please enter exactly two values: px and direction (e.g., '20 h').")
            continue
        
        try:
            px = float(parts[0])
            direction = parts[1].lower()
            result = px_to_percent(px, direction)
            if result is None:
                print("Direction must be 'h' or 'v'. Try again!")
            else:
                percent_str = f"{result:.2f}%"
                pyperclip.copy(percent_str)
                print(f"{px}px ≈ {percent_str} ({direction}) - Copied to clipboard! 🎉\n")
        except ValueError:
            print("First value must be a number. Please try again.")

if __name__ == "__main__":
    main()

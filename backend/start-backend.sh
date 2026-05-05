#!/bin/bash

# AyurMind Backend Startup Script
# This script helps you manage your backend server

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to check if MongoDB is running
check_mongodb() {
    if command_exists mongod; then
        if pgrep -x "mongod" > /dev/null; then
            print_success "MongoDB is running"
            return 0
        else
            print_warning "MongoDB is not running"
            return 1
        fi
    else
        print_error "MongoDB is not installed"
        return 1
    fi
}

# Function to check if Node.js is installed
check_node() {
    if command_exists node; then
        NODE_VERSION=$(node --version)
        print_success "Node.js is installed: $NODE_VERSION"
        return 0
    else
        print_error "Node.js is not installed"
        return 1
    fi
}

# Function to check if .env file exists
check_env() {
    if [ -f ".env" ]; then
        print_success ".env file exists"
        return 0
    else
        print_warning ".env file not found"
        if [ -f "env.example" ]; then
            print_status "Copying env.example to .env..."
            cp env.example .env
            print_warning "Please edit .env file with your configuration"
            return 1
        else
            print_error "No environment configuration found"
            return 1
        fi
    fi
}

# Function to install dependencies
install_deps() {
    print_status "Installing dependencies..."
    if [ -f "package.json" ]; then
        npm install
        print_success "Dependencies installed"
    else
        print_error "package.json not found"
        exit 1
    fi
}

# Function to start MongoDB
start_mongodb() {
    print_status "Starting MongoDB..."
    if command_exists brew; then
        brew services start mongodb-community
        sleep 3
        if check_mongodb; then
            print_success "MongoDB started successfully"
        else
            print_error "Failed to start MongoDB"
            exit 1
        fi
    else
        print_warning "Homebrew not found. Please start MongoDB manually"
        exit 1
    fi
}

# Function to seed database
seed_database() {
    print_status "Seeding database..."
    if [ -f "scripts/seedComprehensiveDiseases.js" ]; then
        node scripts/seedComprehensiveDiseases.js
        print_success "Database seeded successfully"
    else
        print_warning "Seed script not found"
    fi
}

# Function to start development server
start_dev() {
    print_status "Starting development server..."
    if [ -f "package.json" ]; then
        npm run dev
    else
        print_error "package.json not found"
        exit 1
    fi
}

# Function to start production server
start_prod() {
    print_status "Starting production server..."
    if [ -f "package.json" ]; then
        npm start
    else
        print_error "package.json not found"
        exit 1
    fi
}

# Function to show help
show_help() {
    echo "AyurMind Backend Management Script"
    echo ""
    echo "Usage: $0 [COMMAND]"
    echo ""
    echo "Commands:"
    echo "  dev         Start development server with auto-reload"
    echo "  prod        Start production server"
    echo "  setup       Initial setup (install deps, check config)"
    echo "  check       Check system requirements"
    echo "  mongodb     Start MongoDB service"
    echo "  seed        Seed database with sample data"
    echo "  status      Show server status"
    echo "  help        Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 setup    # First time setup"
    echo "  $0 dev      # Start development server"
    echo "  $0 prod     # Start production server"
}

# Function to check server status
check_status() {
    print_status "Checking server status..."
    
    # Check if server is running
    if pgrep -f "node.*server.js" > /dev/null; then
        print_success "Backend server is running"
        # Get the port from .env or default
        PORT=$(grep PORT .env 2>/dev/null | cut -d'=' -f2 || echo "5002")
        print_status "Server should be available at: http://localhost:$PORT"
    else
        print_warning "Backend server is not running"
    fi
    
    # Check MongoDB
    check_mongodb
    
    # Check Node.js
    check_node
}

# Main script logic
case "${1:-help}" in
    "dev")
        print_status "Starting development mode..."
        check_node || exit 1
        check_env || exit 1
        check_mongodb || start_mongodb
        install_deps
        start_dev
        ;;
    "prod")
        print_status "Starting production mode..."
        check_node || exit 1
        check_env || exit 1
        check_mongodb || start_mongodb
        install_deps
        start_prod
        ;;
    "setup")
        print_status "Running initial setup..."
        check_node || exit 1
        check_env
        install_deps
        check_mongodb || start_mongodb
        seed_database
        print_success "Setup complete! Run '$0 dev' to start development server"
        ;;
    "check")
        print_status "Checking system requirements..."
        check_node
        check_mongodb
        check_env
        print_status "System check complete"
        ;;
    "mongodb")
        start_mongodb
        ;;
    "seed")
        check_mongodb || exit 1
        seed_database
        ;;
    "status")
        check_status
        ;;
    "help"|*)
        show_help
        ;;
esac

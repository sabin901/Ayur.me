#!/bin/bash

# AyurMind Backend Monitoring Script
# This script monitors your backend health and performance

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
BACKEND_URL="http://localhost:5002"
HEALTH_ENDPOINT="$BACKEND_URL/health"
DISEASES_ENDPOINT="$BACKEND_URL/api/diseases?limit=1"

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

# Function to check if backend is responding
check_backend_health() {
    print_status "Checking backend health..."
    
    if curl -s -f "$HEALTH_ENDPOINT" > /dev/null 2>&1; then
        print_success "Backend is healthy and responding"
        return 0
    else
        print_error "Backend is not responding"
        return 1
    fi
}

# Function to check API endpoints
check_api_endpoints() {
    print_status "Checking API endpoints..."
    
    # Check diseases endpoint
    if curl -s -f "$DISEASES_ENDPOINT" > /dev/null 2>&1; then
        print_success "Diseases API is working"
    else
        print_error "Diseases API is not responding"
        return 1
    fi
}

# Function to check database connection
check_database() {
    print_status "Checking database connection..."
    
    # Try to get a disease count
    DISEASE_COUNT=$(curl -s "$DISEASES_ENDPOINT" | grep -o '"totalDiseases":[0-9]*' | grep -o '[0-9]*' || echo "0")
    
    if [ "$DISEASE_COUNT" -gt 0 ]; then
        print_success "Database connected - $DISEASE_COUNT diseases available"
    else
        print_warning "Database may be empty or not connected"
    fi
}

# Function to check system resources
check_system_resources() {
    print_status "Checking system resources..."
    
    # Check if Node.js process is running
    if pgrep -f "node.*server.js" > /dev/null; then
        NODE_PID=$(pgrep -f "node.*server.js")
        print_success "Backend process running (PID: $NODE_PID)"
        
        # Get memory usage
        MEMORY_USAGE=$(ps -p $NODE_PID -o %mem --no-headers | tr -d ' ')
        print_status "Memory usage: ${MEMORY_USAGE}%"
    else
        print_error "Backend process not found"
        return 1
    fi
    
    # Check MongoDB process
    if pgrep -x "mongod" > /dev/null; then
        print_success "MongoDB is running"
    else
        print_error "MongoDB is not running"
        return 1
    fi
}

# Function to show detailed status
show_detailed_status() {
    print_status "=== AyurMind Backend Status ==="
    echo ""
    
    # System resources
    check_system_resources
    echo ""
    
    # Backend health
    check_backend_health
    echo ""
    
    # API endpoints
    check_api_endpoints
    echo ""
    
    # Database
    check_database
    echo ""
    
    # Show recent logs (if available)
    if [ -f "logs/server.log" ]; then
        print_status "Recent server logs:"
        tail -5 logs/server.log
    fi
}

# Function to show quick status
show_quick_status() {
    if check_backend_health > /dev/null 2>&1; then
        print_success "Backend is running and healthy"
    else
        print_error "Backend is not responding"
        exit 1
    fi
}

# Function to show help
show_help() {
    echo "AyurMind Backend Monitoring Script"
    echo ""
    echo "Usage: $0 [COMMAND]"
    echo ""
    echo "Commands:"
    echo "  status      Show detailed status (default)"
    echo "  quick       Show quick status"
    echo "  health      Check backend health only"
    echo "  api         Check API endpoints only"
    echo "  database    Check database connection only"
    echo "  resources   Check system resources only"
    echo "  help        Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0          # Show detailed status"
    echo "  $0 quick    # Show quick status"
    echo "  $0 health   # Check health only"
}

# Main script logic
case "${1:-status}" in
    "status")
        show_detailed_status
        ;;
    "quick")
        show_quick_status
        ;;
    "health")
        check_backend_health
        ;;
    "api")
        check_api_endpoints
        ;;
    "database")
        check_database
        ;;
    "resources")
        check_system_resources
        ;;
    "help"|*)
        show_help
        ;;
esac

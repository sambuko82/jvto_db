# JVTO Unified Dashboard - API Routes Documentation

## Overview
Comprehensive API routes for connecting Dashboard to PostgreSQL Database Mirror and MySQL Backoffice systems.

---

## 🏥 Health & Monitoring

### `GET /api/health`
Health check for all integrated systems.

**Response:**
```json
{
  "status": "healthy|degraded|unhealthy",
  "postgres": {
    "connected": boolean,
    "latency": number,
    "error": string (if failed)
  },
  "mysql": {
    "connected": boolean,
    "latency": number,
    "error": string (if failed)
  },
  "ssot": {
    "loaded": boolean,
    "lastSync": ISO8601,
    "error": string (if failed)
  },
  "timestamp": ISO8601
}
```

**Status Codes:**
- `200` - All systems healthy
- `206` - Partial failure (degraded)
- `503` - Critical failure (unhealthy)

---

## 📊 Database Mirror (PostgreSQL)

### `GET /api/db/stats`
Get database statistics and top tables.

**Response:**
```json
{
  "success": true,
  "data": {
    "totalTables": 95,
    "totalRecords": 1247,
    "tables": [
      {
        "name": "bookings",
        "records": 415
      },
      {
        "name": "customers",
        "records": 442
      }
    ]
  },
  "timestamp": ISO8601
}
```

---

### `GET /api/db/tables`
List and search database tables with pagination.

**Query Parameters:**
| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `limit` | number | 20 | Results per page (max 100) |
| `offset` | number | 0 | Pagination offset |
| `search` | string | "" | Search table names |
| `table` | string | "" | Get specific table data (returns table data instead of list) |

**Response (List):**
```json
{
  "success": true,
  "data": {
    "tables": ["bookings", "customers", "destinations"],
    "total": 95,
    "limit": 20,
    "offset": 0,
    "hasMore": true
  },
  "timestamp": ISO8601
}
```

**Response (Table Data - when `?table=bookings`):**
```json
{
  "success": true,
  "data": {
    "table": "bookings",
    "columns": ["id", "booking_number", "customer_id", "status"],
    "data": [...],
    "count": 100
  },
  "timestamp": ISO8601
}
```

**Examples:**
```bash
# List all tables
GET /api/db/tables

# Search tables
GET /api/db/tables?search=customer&limit=10

# Get specific table data
GET /api/db/tables?table=bookings&limit=100
```

---

## 🎫 Backoffice (MySQL)

### `GET /api/backoffice/stats`
Get backoffice statistics (bookings, payments, customers).

**Response:**
```json
{
  "success": true,
  "data": {
    "activeBookings": 415,
    "totalPayments": 45000000,
    "totalCustomers": 442
  },
  "timestamp": ISO8601
}
```

---

### `GET /api/backoffice/bookings`
Get recent bookings from backoffice.

**Query Parameters:**
| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `limit` | number | 10 | Max results (max 100) |

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "booking_number": "BK20260408001",
      "customer_id": 123,
      "tour_date": "2026-04-15",
      "total_price": 2500000,
      "status": "confirmed",
      "created_at": "2026-04-08T10:30:00Z"
    }
  ],
  "timestamp": ISO8601
}
```

---

### `GET /api/backoffice/payments`
Get recent payments from backoffice.

**Query Parameters:**
| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `limit` | number | 10 | Max results (max 100) |

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "booking_id": 1,
      "amount": 2500000,
      "payment_method": "bank_transfer",
      "status": "completed",
      "created_at": "2026-04-08T10:35:00Z"
    }
  ],
  "timestamp": ISO8601
}
```

---

## 📋 SSOT (Single Source of Truth)

### `GET /api/ssot/data`
Load and retrieve SSOT JSON data.

**Query Parameters:**
| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `section` | string | "" | Specific SSOT section (destinations, tours, categories) |
| `reload` | boolean | false | Force reload from file |

**Response:**
```json
{
  "success": true,
  "data": {
    "version": "4.0",
    "lastUpdated": "2026-04-08",
    "destinations": {...},
    "tours": {...},
    "categories": {...}
  },
  "timestamp": ISO8601
}
```

**Examples:**
```bash
# Get entire SSOT
GET /api/ssot/data

# Get specific section
GET /api/ssot/data?section=destinations

# Force reload
GET /api/ssot/data?reload=true
```

---

### `GET /api/ssot/status`
Get SSOT cache and sync status.

**Response:**
```json
{
  "success": true,
  "data": {
    "loaded": true,
    "lastSync": "2026-04-08T08:00:00Z",
    "cacheValid": true
  },
  "timestamp": ISO8601
}
```

---

## 🔐 Environment Variables

Required in `.env.local`:

**PostgreSQL Database Mirror:**
```
DB_HOST=31.97.223.43
DB_PORT=5432
DB_NAME=jvto_dev
DB_USER=postgres
DB_PASSWORD=SuksesL@ncarRezek1
DB_SSL=disable
```

**MySQL Backoffice:**
```
BACKOFFICE_DB_HOST=153.92.9.37
BACKOFFICE_DB_PORT=3306
BACKOFFICE_DB_NAME=u1805424_jvto_clone
BACKOFFICE_DB_USER=u1805424_jvto_clone
BACKOFFICE_DB_PASSWORD=mwb546hs51
```

**Application:**
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
SSOT_FILE_PATH=./public/JVTO_SSOT_v4_0_CLEAN.json
SSOT_SYNC_INTERVAL=86400
NODE_ENV=development
```

---

## 🚀 Usage Examples

### In React Components

```typescript
import { fetchDatabaseStats, fetchBackofficeStats } from '@/lib/api-client';

export default function Dashboard() {
  const [dbStats, setDbStats] = useState(null);
  
  useEffect(() => {
    const loadData = async () => {
      const stats = await fetchDatabaseStats();
      setDbStats(stats);
    };
    
    loadData();
  }, []);
  
  return <div>{dbStats?.totalTables} tables</div>;
}
```

### Direct API Calls

```bash
# Check system health
curl http://localhost:3000/api/health

# Get database stats
curl http://localhost:3000/api/db/stats

# Get recent bookings
curl http://localhost:3000/api/backoffice/bookings?limit=5

# Get SSOT data
curl http://localhost:3000/api/ssot/data?section=destinations
```

---

## ⚡ Error Handling

All API endpoints return consistent error responses:

```json
{
  "success": false,
  "error": "Error message describing what failed",
  "timestamp": ISO8601
}
```

Status Codes:
- `200` - Success
- `206` - Partial success (health check)
- `404` - Not found (section in SSOT)
- `500` - Server error
- `503` - Service unavailable

---

## 📈 Performance Notes

- **Database Queries:** Connection pooling enabled (PostgreSQL: 20, MySQL: 10)
- **SSOT Caching:** 24-hour cache with force reload option
- **Pagination:** Default 20 items, max 100
- **Timeouts:** API calls timeout at 10 seconds
- **Connection Cleanup:** Automatic connection pooling

---

## 🔄 Data Flow

```
Dashboard (React) 
    ↓
API Client (@/lib/api-client.ts)
    ↓
Next.js API Routes (/app/api/*)
    ↓
Database Utilities
    ├── PostgreSQL (Database Mirror)
    ├── MySQL (Backoffice)
    └── SSOT JSON (Caching)
    ↓
Response Back to Dashboard
```

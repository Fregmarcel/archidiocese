# Test des API Actualités

Ce document explique comment tester les opérations CRUD sur les actualités et vérifier que les données sont bien enregistrées dans MongoDB.

## 📋 Prérequis

1. MongoDB doit être configuré et accessible via `MONGODB_URI` dans `.env.local`
2. L'utilisateur doit être authentifié et avoir les droits admin (via Clerk)

## 🧪 Tests des opérations

### 1. CREATE (Créer une actualité)

**Endpoint:** `POST /api/admin/news`

**Requête:**
```json
{
  "title": "Test Actualité",
  "slug": "test-actualite",
  "excerpt": "Ceci est un test",
  "content": "<p>Contenu de test</p>",
  "image": "/uploads/news/test.jpg",
  "tags": ["Test", "UCAC"],
  "locale": "fr",
  "status": "published",
  "publishedAt": "2025-10-31T10:00:00"
}
```

**Vérification MongoDB:**
```javascript
db.news.find({ slug: "test-actualite" })
```

### 2. READ (Lire les actualités)

**Endpoint:** `GET /api/admin/news?locale=fr`

**Réponse attendue:**
```json
{
  "data": [
    {
      "_id": "...",
      "title": "Test Actualité",
      "slug": "test-actualite",
      ...
    }
  ]
}
```

**Vérification MongoDB:**
```javascript
db.news.find({ locale: "fr" }).sort({ publishedAt: -1 })
```

### 3. UPDATE (Modifier une actualité)

**Endpoint:** `PUT /api/admin/news/{id}`

**Requête:**
```json
{
  "title": "Test Actualité Modifiée",
  "status": "draft"
}
```

**Vérification MongoDB:**
```javascript
db.news.findOne({ _id: ObjectId("...") })
// Vérifier que title et status ont changé
```

### 4. DELETE (Supprimer une actualité)

**Endpoint:** `DELETE /api/admin/news/{id}`

**Vérification MongoDB:**
```javascript
db.news.findOne({ _id: ObjectId("...") })
// Doit retourner null
```

## ✅ Validation complète

### Scénario de test complet:

1. **Créer** une actualité via le backoffice
2. **Vérifier** dans MongoDB Atlas (ou Compass):
   ```javascript
   use archidiocese
   db.news.find().pretty()
   ```
3. **Modifier** l'actualité (changer le titre)
4. **Rafraîchir** la page → vérifier que le changement apparaît
5. **Vérifier** dans MongoDB que les données ont changé
6. **Supprimer** l'actualité
7. **Vérifier** qu'elle n'apparaît plus dans la liste
8. **Vérifier** dans MongoDB qu'elle est supprimée

## 🔍 Vérification en temps réel

### Via le backoffice:
1. Aller dans **Admin → Accueil → Actualités**
2. Créer une nouvelle actualité
3. Vérifier qu'elle apparaît dans le tableau
4. Modifier et vérifier que les changements sont persistés
5. Supprimer et vérifier qu'elle disparaît

### Via MongoDB:
- **MongoDB Atlas**: Console web → Database → Collections → news
- **MongoDB Compass**: Connexion → archidiocese → news
- **CLI Mongo**:
  ```bash
  mongosh "mongodb+srv://..."
  use archidiocese
  db.news.find()
  ```

## 🚀 Points de validation

- ✅ **Create**: La nouvelle actualité apparaît dans MongoDB avec tous les champs
- ✅ **Read**: Le tableau affiche toutes les actualités de la base
- ✅ **Update**: Les modifications sont sauvegardées (updatedAt change)
- ✅ **Delete**: L'actualité est supprimée de la base de données
- ✅ **Index**: Les requêtes utilisent les index (locale, status, publishedAt)
- ✅ **Timestamps**: createdAt et updatedAt sont automatiques

## 📊 Structure MongoDB

```javascript
{
  _id: ObjectId("..."),
  title: "Titre de l'actualité",
  slug: "titre-de-lactualite",
  excerpt: "Court résumé...",
  content: "<p>Contenu HTML...</p>",
  image: "/uploads/news/image.jpg",
  tags: ["Tag1", "Tag2"],
  locale: "fr",
  status: "published",
  publishedAt: ISODate("2025-10-31T10:00:00.000Z"),
  createdAt: ISODate("2025-10-31T09:00:00.000Z"),
  updatedAt: ISODate("2025-10-31T09:30:00.000Z")
}
```

## 🔧 Dépannage

### Erreur: "Cannot connect to MongoDB"
- Vérifier `MONGODB_URI` dans `.env.local`
- Vérifier que MongoDB est accessible

### Les données ne s'affichent pas
- Vérifier le filtre `locale` (doit correspondre)
- Vérifier que `status: 'published'` pour l'API publique

### Les modifications ne sont pas sauvegardées
- Vérifier la console réseau (F12)
- Vérifier les logs serveur
- Vérifier les permissions utilisateur

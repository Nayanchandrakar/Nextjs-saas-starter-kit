import { RBACService } from "@/database/services/rbac-service"

async function seedDatabase() {
  console.log("🌱 Seeding database...")

  console.log("🌱 Seeding roles and role_permissions...")
  await RBACService.initializeRBAC()
  console.log("✅ Done seeding.")
}

seedDatabase().catch((error) => {
  console.error("❌ Seeding failed:", error)
  process.exit(1)
})

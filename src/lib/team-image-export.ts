// Team Image Export utilities
import type { TeamBuilderTeam, SkillOrder, HeroData } from "./types";
import { getHeroImagePath, getPetIconPath } from "./utils";

// Helper: Draw rounded rectangle
function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

// Helper: Draw individual hero card
async function drawHeroCard(
  ctx: CanvasRenderingContext2D,
  x: number,
  baseY: number,
  heroName: string,
  tier: number,
  gearSet: string | null,
  skillOrder: SkillOrder[],
  formation: string,
  slotIndex: number,
  cardHeight: number,
  heroData: Record<string, HeroData>
) {
  const cardWidth = 140;

  // Determine row (front/back) based on formation
  const formations: Record<string, ("front" | "back")[]> = {
    basic: ["back", "front", "back", "front", "back"],
    balanced: ["front", "back", "front", "back", "front"],
    attack: ["back", "back", "front", "back", "back"],
    protective: ["front", "front", "back", "front", "front"],
  };
  const row = formations[formation]?.[slotIndex] || "back";

  // Apply vertical offset to ENTIRE card position (front lower, back higher)
  const rowOffset = row === "front" ? 30 : -30;
  const y = baseY + rowOffset;

  // Card background with type-based border
  const typeColors: Record<string, string> = {
    Attack: "#c93939",
    Magic: "#3b82f6",
    Defense: "#a67c52",
    Support: "#eab308",
    Universal: "#9333ea",
  };

  const heroInfo = heroData[heroName];
  const borderColor =
    (heroInfo && typeColors[heroInfo.type]) || "rgba(147, 112, 219, 0.4)";

  ctx.fillStyle = "rgba(10, 8, 16, 0.9)";
  ctx.strokeStyle = borderColor;
  ctx.lineWidth = 3;
  roundRect(ctx, x, y, cardWidth, cardHeight, 10);
  ctx.fill();
  ctx.stroke();

  // Load and draw hero portrait
  let currentY = y + 30;
  const img = new Image();
  const imagePath = getHeroImagePath(heroName, false, true); // Use Downloaded Hero Portraits

  await new Promise<void>((resolve) => {
    img.onload = () => {
      const imgSize = 80;
      const imgX = x + (cardWidth - imgSize) / 2;
      const imgY = currentY;

      // Draw as square (no clipping)
      ctx.drawImage(img, imgX, imgY, imgSize, imgSize);

      // Border around portrait
      ctx.strokeStyle = "rgba(147, 112, 219, 0.5)";
      ctx.lineWidth = 2;
      ctx.strokeRect(imgX, imgY, imgSize, imgSize);

      resolve();
    };
    img.onerror = () => {
      console.warn(`Failed to load hero image: ${imagePath}`);
      resolve(); // Continue even if image fails
    };
    img.src = imagePath;
  });

  // Hero name
  currentY += 95;
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 12px Arial";
  ctx.textAlign = "center";
  ctx.fillText(heroName, x + cardWidth / 2, currentY);

  // Transcendence stars (yellow with blue outline when active)
  currentY += 18;
  ctx.font = "14px Arial";
  const starWidth = ctx.measureText("★").width;
  const starSpacing = 3;
  const totalStarWidth = starWidth * 6 + 5 * starSpacing;
  const starStartX = x + (cardWidth - totalStarWidth) / 2 + 5;

  for (let i = 0; i < 6; i++) {
    const starX = starStartX + i * (starWidth + starSpacing);

    // All stars are yellow
    ctx.fillStyle = "#fbbf24";
    ctx.fillText("★", starX, currentY);

    // Active stars get blue outline
    if (i < tier) {
      ctx.strokeStyle = "#3b82f6";
      ctx.lineWidth = 1.5;
      ctx.strokeText("★", starX, currentY);
    }
  }

  // Skill order (below stars)
  currentY += 15;
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 9px Arial";
  ctx.textAlign = "center";
  ctx.fillText("Skills:", x + cardWidth / 2, currentY);

  // Check which skills are present
  const s1Skill =
    skillOrder && Array.isArray(skillOrder)
      ? skillOrder.find((s) => s.skill === "s1")
      : null;
  const s2Skill =
    skillOrder && Array.isArray(skillOrder)
      ? skillOrder.find((s) => s.skill === "s2")
      : null;

  // Draw s2 (top skill, top position)
  currentY += 25;
  if (s2Skill) {
    const hue = 120 - (s2Skill.order - 1) * (120 / 9);
    ctx.fillStyle = `hsl(${hue}, 70%, 50%)`;
    roundRect(ctx, x + 42, currentY - 18, 56, 22, 4);
    ctx.fill();

    ctx.fillStyle = "#000000";
    ctx.font = "bold 13px Arial";
    ctx.textAlign = "center";
    ctx.fillText(s2Skill.order.toString(), x + cardWidth / 2, currentY - 4);
  } else {
    // No s2 skill - show grey N/A
    ctx.fillStyle = "#6b7280";
    roundRect(ctx, x + 42, currentY - 18, 56, 22, 4);
    ctx.fill();

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 11px Arial";
    ctx.textAlign = "center";
    ctx.fillText("N/A", x + cardWidth / 2, currentY - 4);
  }

  // Draw s1 (bottom skill, bottom position)
  currentY += 25;
  if (s1Skill) {
    const hue = 120 - (s1Skill.order - 1) * (120 / 9);
    ctx.fillStyle = `hsl(${hue}, 70%, 50%)`;
    roundRect(ctx, x + 42, currentY - 18, 56, 22, 4);
    ctx.fill();

    ctx.fillStyle = "#000000";
    ctx.font = "bold 13px Arial";
    ctx.textAlign = "center";
    ctx.fillText(s1Skill.order.toString(), x + cardWidth / 2, currentY - 4);
  } else {
    // No s1 skill - show grey N/A
    ctx.fillStyle = "#6b7280";
    roundRect(ctx, x + 42, currentY - 18, 56, 22, 4);
    ctx.fill();

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 11px Arial";
    ctx.textAlign = "center";
    ctx.fillText("N/A", x + cardWidth / 2, currentY - 4);
  }

  // Gear set name at bottom
  if (gearSet && gearSet !== "null" && gearSet !== "") {
    if (!skillOrder || !Array.isArray(skillOrder) || skillOrder.length === 0) {
      currentY += 20;
    } else {
      currentY += 30;
    }
    ctx.fillStyle = "#c0c0c0";
    ctx.font = "bold 11px Arial";
    ctx.textAlign = "center";
    ctx.fillText(gearSet, x + cardWidth / 2, currentY);
  }
}

// Helper: Draw pet
async function drawPet(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  petName: string
) {
  const petWidth = 120;
  const petHeight = 140;

  ctx.fillStyle = "rgba(255, 215, 0, 0.2)";
  ctx.strokeStyle = "rgba(255, 215, 0, 0.6)";
  ctx.lineWidth = 2;
  roundRect(ctx, x, y, petWidth, petHeight, 8);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 12px Arial";
  ctx.textAlign = "center";
  ctx.fillText("PET", x + petWidth / 2, y + 18);

  // Load and draw pet icon
  const petImg = new Image();
  const petPath = getPetIconPath(petName);

  if (petPath) {
    await new Promise<void>((resolve) => {
      petImg.onload = () => {
        const petImgSize = 80;
        const petImgX = x + (petWidth - petImgSize) / 2;
        const petImgY = y + 30;

        // Draw pet image
        ctx.drawImage(petImg, petImgX, petImgY, petImgSize, petImgSize);

        resolve();
      };
      petImg.onerror = () => {
        console.warn(`Failed to load pet image: ${petPath}`);
        resolve(); // Continue even if image fails
      };
      petImg.src = petPath;
    });
  }

  // Pet name below image
  ctx.font = "bold 11px Arial";
  ctx.fillText(petName, x + petWidth / 2, y + 120);
}

// Helper: Draw notes section
function drawNotes(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  notes: string
) {
  const notesHeight = 140;

  // Box background
  ctx.fillStyle = "rgba(59, 130, 246, 0.2)";
  ctx.strokeStyle = "rgba(59, 130, 246, 0.6)";
  ctx.lineWidth = 2;
  roundRect(ctx, x, y, width, notesHeight, 8);
  ctx.fill();
  ctx.stroke();

  // Title
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 12px Arial";
  ctx.textAlign = "left";
  ctx.fillText("SPECIAL NOTES", x + 10, y + 18);

  // Notes content
  if (notes && notes.trim()) {
    ctx.fillStyle = "#e0e0e0";
    ctx.font = "11px Arial";

    // Word wrap the notes
    const maxWidth = width - 20;
    const lineHeight = 16;
    const words = notes.split(" ");
    let line = "";
    let currentY = y + 40;

    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + " ";
      const metrics = ctx.measureText(testLine);

      if (metrics.width > maxWidth && i > 0) {
        ctx.fillText(line, x + 10, currentY);
        line = words[i] + " ";
        currentY += lineHeight;

        // Stop if we run out of space
        if (currentY > y + notesHeight - 20) break;
      } else {
        line = testLine;
      }
    }
    // Draw remaining line
    if (currentY <= y + notesHeight - 20) {
      ctx.fillText(line, x + 10, currentY);
    }
  } else {
    ctx.fillStyle = "#808080";
    ctx.font = "italic 11px Arial";
    ctx.fillText("No special notes", x + 10, y + 40);
  }
}

// Generate a beautifully styled canvas image (advent team style)
export async function generateTeamCanvas(
  team: TeamBuilderTeam,
  teamIndex: number,
  heroData: Record<string, HeroData>
): Promise<HTMLCanvasElement> {
  // Create canvas
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Failed to get canvas context");
  }

  // Canvas dimensions
  const cardWidth = 140;
  const cardGap = 12;
  const headerHeight = 80;
  const petHeight = 150;
  const padding = 20;

  // Count non-null heroes
  const heroCount = team.slots.filter((h) => h !== null).length;
  const canvasWidth =
    heroCount * cardWidth + (heroCount - 1) * cardGap + padding * 2;
  const cardHeight = 280;
  const canvasHeight = headerHeight + cardHeight + 80 + petHeight + padding * 2;

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  // Background
  ctx.fillStyle = "#0f0f23";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  // Header section
  const formationType = team.formationType || "basic";
  const formationNames: Record<string, string> = {
    basic: "BASIC FORMATION (2 Front, 3 Back)",
    balanced: "BALANCED FORMATION (3 Front, 2 Back)",
    attack: "ATTACK FORMATION (1 Front, 4 Back)",
    protective: "PROTECTIVE FORMATION (4 Front, 1 Back)",
  };

  // Draw header background
  ctx.fillStyle = "rgba(197, 163, 255, 0.15)";
  ctx.strokeStyle = "rgba(197, 163, 255, 0.3)";
  ctx.lineWidth = 2;
  roundRect(ctx, padding, padding, canvasWidth - padding * 2, 60, 8);
  ctx.fill();
  ctx.stroke();

  // Draw team name
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 18px Arial";
  ctx.textAlign = "center";
  ctx.fillText(
    team.name || `Team ${teamIndex + 1}`,
    canvasWidth / 2,
    padding + 25
  );

  // Draw formation info
  ctx.fillStyle = "#c5a3ff";
  ctx.font = "bold 14px Arial";
  ctx.fillText(formationNames[formationType], canvasWidth / 2, padding + 50);

  // Draw heroes
  let xOffset = padding;
  const yStart = headerHeight + padding + 30;

  for (let i = 0; i < team.slots.length; i++) {
    const heroName = team.slots[i];
    if (!heroName) continue;

    await drawHeroCard(
      ctx,
      xOffset,
      yStart,
      heroName,
      team.tiers[i] || 0,
      team.gearSets[i] || null,
      team.skillOrders[i] || [],
      team.formationType,
      i,
      cardHeight,
      heroData
    );
    xOffset += cardWidth + cardGap;
  }

  // Draw pet and notes section at bottom
  const bottomY = yStart + cardHeight + 50;

  if (team.pet) {
    await drawPet(ctx, padding, bottomY, team.pet);
  }

  // Notes section
  const notesX = team.pet ? padding + 140 : padding;
  const notesWidth = canvasWidth - notesX - padding;
  drawNotes(ctx, notesX, bottomY, notesWidth, team.notes || "");

  // Watermark at bottom right
  ctx.fillStyle = "rgba(234, 179, 8, 0.6)";
  ctx.font = "bold 14px Arial";
  ctx.textAlign = "right";
  ctx.fillText("OBSIDIAN7KDB.INFO", canvasWidth - padding, canvasHeight - 10);

  return canvas;
}

// Export all teams as a single image
export async function generateAllTeamsCanvas(
  teams: TeamBuilderTeam[],
  heroData: Record<string, HeroData>
): Promise<HTMLCanvasElement> {
  const padding = 20;
  const teamsPerRow = 2;
  const teamGap = 30;
  const cardWidth = 140;
  const cardGap = 12;
  const headerHeight = 80;
  const petHeight = 150;
  const cardHeight = 280;
  const teamHeight = headerHeight + cardHeight + 80 + petHeight + padding * 2;

  // Calculate canvas dimensions
  const rows = Math.ceil(teams.length / teamsPerRow);
  const canvasWidth =
    teamsPerRow * (cardWidth * 5 + cardGap * 4 + padding * 2) +
    (teamsPerRow - 1) * teamGap +
    padding * 2;
  const canvasHeight = rows * teamHeight + (rows - 1) * teamGap + padding * 2;

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Failed to get canvas context");
  }

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  // Background
  ctx.fillStyle = "#0f0f23";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  // Draw each team
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < teamsPerRow; col++) {
      const teamIndex = row * teamsPerRow + col;
      if (teamIndex >= teams.length) break;

      const team = teams[teamIndex];
      const teamCanvas = await generateTeamCanvas(team, teamIndex, heroData);

      const x =
        col * (cardWidth * 5 + cardGap * 4 + padding * 2 + teamGap) + padding;
      const y = row * (teamHeight + teamGap) + padding;

      ctx.drawImage(teamCanvas, x, y);
    }
  }

  // Watermark at bottom right
  ctx.fillStyle = "rgba(234, 179, 8, 0.6)";
  ctx.font = "bold 14px Arial";
  ctx.textAlign = "right";
  ctx.fillText("OBSIDIAN7KDB.INFO", canvasWidth - padding, canvasHeight - 10);

  return canvas;
}

// Copy canvas to clipboard
export async function copyCanvasToClipboard(
  canvas: HTMLCanvasElement
): Promise<boolean> {
  try {
    if (navigator.clipboard && window.ClipboardItem) {
      const item = new ClipboardItem({
        "image/png": new Promise<Blob>((resolve) => {
          canvas.toBlob((blob) => {
            if (blob) {
              resolve(blob);
            } else {
              throw new Error("Failed to create blob");
            }
          }, "image/png");
        }),
      });

      await navigator.clipboard.write([item]);
      return true;
    }
    return false;
  } catch (err) {
    console.error("Failed to copy to clipboard:", err);
    return false;
  }
}

// Download canvas as image
export function downloadCanvasAsImage(
  canvas: HTMLCanvasElement,
  filename: string
) {
  canvas.toBlob((blob) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = filename;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  }, "image/png");
}
